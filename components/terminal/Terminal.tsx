"use client";

import type React from "react";

import { downloadUrl, portfolioData } from "@/constant/terminal";
import { useEffect, useRef, useState } from "react";

interface Command {
  input: string;
  output: string[];
}

export default function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (input: string): string[] => {
    const cmd = input.trim().toLowerCase();
    const args = cmd.split(" ");

    switch (args[0]) {
      case "help":
        return [
          "Available commands:",
          "  help            - Show this help message",
          "  skills          - List my technical skills",
          "  projects        - Show my projects",
          "  open <project>  - View project details",
          "  download cv     - Download my resume",
          "  contact         - Show contact information",
          "  clear           - Clear the terminal",
          "  whoami          - Show information about me",
        ];

      case "skills":
        return [
          "My Technical Skills:",
          ...portfolioData.skills.map((skill) => `  • ${skill}`),
        ];

      case "projects":
        return [
          "My Projects:",
          ...portfolioData.projects.map(
            (project) => `  • ${project.name} (${project.status})`
          ),
          "",
          "Use 'open <project-name>' to view details",
        ];

      case "open":
        if (args.length < 2) {
          return ["Usage: open <project-name>"];
        }
        const projectName = args.slice(1).join("-");
        const project = portfolioData.projects.find(
          (p) => p.name === projectName
        );
        if (project) {
          return [
            `Project: ${project.name}`,
            `Overview: ${project.description}`,
            `Technologies: ${project.tech}`,
            `Status: ${project.status}`,
          ];
        }
        return [
          `Project '${projectName}' not found. Use 'projects' to see available projects.`,
        ];

      case "download":
        if (args[1] === "cv") {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "Shahadath_Hossen_Sajib_Resume.pdf";
            link.click();
          }, 1000);
          return ["Downloading resume... Please check your downloads folder."];
        }
        return ["Usage: download cv"];

      case "contact":
        return [
          "Contact Information:",
          `  Email: ${portfolioData.contact.email}`,
          `  LinkedIn: ${portfolioData.contact.linkedin}`,
          `  GitHub: ${portfolioData.contact.github}`,
          `  Website: ${portfolioData.contact.website}`,
        ];

      case "clear":
        setCommands([]);
        return [];

      case "whoami":
        return [
          "Shahadath Hossen Sajib",
          "Backend Developer",
          "",
          "I’m a passionate developer with expertise in modern web technologies.",
          "I love building scalable applications and solving complex problems.",
        ];

      case "":
        return [];

      default:
        return [
          `Command not found: ${args[0]}. Type 'help' for available commands.`,
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setIsTyping(true);
    const output = executeCommand(currentInput);

    if (currentInput.trim().toLowerCase() !== "clear") {
      setCommands((prev) => [...prev, { input: currentInput, output }]);
    }

    setCurrentInput("");

    setTimeout(() => {
      setIsTyping(false);
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commands]);

  useEffect(() => {
    // Welcome message
    setCommands([
      {
        input: "",
        output: [
          "Welcome to Sajib's Portfolio Terminal!",
          "Type 'help' to see available commands.",
          "",
        ],
      },
    ]);
  }, []);

  return (
    <div ref={terminalRef} className="h-[400px] p-4 overflow-y-auto">
      {commands.map((command, index) => (
        <div key={index} className="mb-2">
          {command.input && (
            <div className="flex">
              <span className="font-bold">sajib@portfolio:~$ </span>
              <span className="ml-1">{command.input}</span>
            </div>
          )}
          {command.output.map((line, lineIndex) => (
            <div key={lineIndex} className="text-sm whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
      ))}

      {isTyping && <span className="animate-pulse">Processing...</span>}

      <form onSubmit={handleSubmit} className="flex mt-2">
        <span className="font-bold">sajib@portfolio:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="ml-1 bg-transparent border-none outline-none  flex-1"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
