"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SiHuggingface } from "@icons-pack/react-simple-icons";

export default function Home() {
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/status");
      const { username } = await response.json();
      setUsername(username);
    };
    checkAuth();
  }, []);

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
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-center h-[calc(10vh)]">
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
            <div className="w-full max-w-2xl mt-8 border rounded-lg shadow-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
              <div className="h-[500px] p-4 overflow-y-auto">
                {/* Messages will go here */}
              </div>
              <div className="p-4 border-t">
                <form className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
