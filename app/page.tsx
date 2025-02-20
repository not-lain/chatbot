"use client";

import * as React from "react";
import { HfInference } from "@huggingface/inference";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SiHuggingface } from "@icons-pack/react-simple-icons";
import { Chat } from "@/components/chatInterface";
import { Message } from "@/components/ui/chat-message";
import { DropDownComponenet } from "@/components/radioDropdown";

const tasks = ["text-generation"];

const providers = [
  "hf-inference",
  "fal-ai",
  "fireworks-ai",
  "hyperbolic",
  "nebius",
  "novita",
  "replicate",
  "sambanova",
  "together",
];

export default function Home() {
  const [username, setUsername] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [availableModels, setAvailableModels] = React.useState<string[]>([]);

  React.useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/status");
      const { username } = await response.json();
      setUsername(username);
    };
    checkAuth();
  }, []);

  // Add new useEffect for initial models fetch
  React.useEffect(() => {
    if (username) {
      // Fetch models with default parameters when component mounts
      getModels(tasks[0], providers[0]);
    }
  }, [username]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const getModels = async (task: string, provider: string) => {
    const tokenResponse = await fetch("/api/auth/token");
    const { token } = await tokenResponse.json();

    const response = await fetch(
      `https://huggingface.co/api/models?filter=${task}&limit=5&full=true&config=true&inference_provider=${provider}&expand=inferenceProviderMapping`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const modelIds = data.map((model: { id: string }) => model.id);

    // Update the state with new models
    setAvailableModels(modelIds);
    return modelIds;
  };

  const handleSubmit = async (event?: { preventDefault?: () => void }) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      // Get access token from cookie
      const response = await fetch("/api/auth/token");
      const { token } = await response.json();

      if (!token) {
        throw new Error("No access token found");
      }

      const client = new HfInference(token);

      const chatCompletion = await client.chatCompletion({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: "user", content: input },
        ],
        provider: providers[0],
        max_tokens: 500,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            chatCompletion.choices[0].message.content ??
            "I couldn't generate a response.",
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request.",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth");
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUsername(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClick = () => {
    if (username) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex flex-1 flex-col items-center gap-4 p-4">
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-semibold"
          onClick={handleClick}
        >
          <SiHuggingface className="mr-2" />
          {username
            ? `Logged in as ${username}`
            : "Login with your Hugging Face account"}
        </Button>

        {username && (
          <>
            <div className="flex items-center gap-4 w-full max-w-2xl">
              <DropDownComponenet
                label="Task"
                id="task"
                dropdown_values={tasks}
                onChange={(task) => {
                  const provider =
                    document
                      .querySelector("#providers")
                      ?.getAttribute("data-value") || providers[0];
                  getModels(task, provider);
                }}
              />
              <DropDownComponenet
                id="providers"
                label="Inference Providers"
                dropdown_values={providers}
                data-provider-dropdown
                onChange={(provider) => {
                  const task =
                    document
                      .querySelector("#task")
                      ?.getAttribute("data-value") || tasks[0];
                  getModels(task, provider);
                }}
              />
              <DropDownComponenet
                id="models"
                label="Models"
                dropdown_values={availableModels}
              />
            </div>
            <div className="flex h-[500px] w-full max-w-2xl mx-auto">
              <Chat
                className="grow"
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isGenerating={isGenerating}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
