"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SiHuggingface } from "@icons-pack/react-simple-icons";
import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";

export default function Home() {
  const [username, setUsername] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/status");
      const { username } = await response.json();
      setUsername(username);
    };
    checkAuth();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsGenerating(true);

    // TODO: Implement actual message handling here
    // This is just a mock response
    setTimeout(() => {
      const response: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "This is a mock response. Implement your actual chat logic here.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsGenerating(false);
    }, 1000);
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
          <div className="w-full max-w-2xl flex-1">
            <Chat
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isGenerating={isGenerating}
              suggestions={[
                "Tell me a joke",
                "What's the weather like?",
                "How can I help you today?",
              ]}
              append={(message) => {
                setMessages((prev) => [
                  ...prev,
                  { ...message, id: Date.now().toString() },
                ]);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
