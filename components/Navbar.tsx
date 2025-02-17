"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Chatbot</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
          <Button variant="ghost">
            <SiGithub />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
