"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SiGithub, SiHuggingface } from "@icons-pack/react-simple-icons";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-1">
        <Button variant="ghost" onClick={() => window.location.href = '/'}><h1 className="text-xl font-bold">Chatbot</h1> </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.location.href = '/about'}>About</Button>
          <Button variant="ghost" onClick={() =>window.open('https://not-lain-chatbot.hf.space', '_blank')}>
            <SiHuggingface />
          </Button>
            <Button variant="ghost" onClick={() => window.open('https://github.com/not-lain/chatbot', '_blank')}>
            <SiGithub />
            </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
