"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SiHuggingface } from "@icons-pack/react-simple-icons";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-center h-[calc(10vh)]">
          <Button size="lg" className="px-8 py-6 text-lg font-semibold ">
            <SiHuggingface />
            Login with your Hugging Face account
          </Button>
        </div>
      </main>
    </div>
  );
}
