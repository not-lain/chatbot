import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex flex-1 flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold">About Chatbot</h1>
        
        <div className="max-w-2xl prose dark:prose-invert">
          <p className="text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo aliquid consectetur illum placeat nam dolore. Accusantium aut numquam minus quisquam, veritatis dolor corrupti esse porro, eaque blanditiis dignissimos ratione quidem.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Features</h2>
          <ul>
            <li>Integration with Hugging Face&apos;s inference API</li>
            <li>Support for multiple AI providers</li>
            <li>Real-time streaming responses</li>
            <li>User authentication via Hugging Face</li>
            <li>Model selection for different tasks and providers</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">How to Use</h2>
          <ol>
            <li>Log in with your Hugging Face account</li>
            <li>Select a task type from the dropdown menu</li>
            <li>Choose an inference provider</li>
            <li>Select a model from the available options</li>
            <li>Start chatting with the AI!</li>
          </ol>

          <p className="mt-6">
            This project is built with Shadcn, Next.js, React, and TypeScript, utilizing
            Hugging Face&apos;s to provide a seamless chat
            experience.
          </p>
        </div>
      </main>
    </div>
  );
}
