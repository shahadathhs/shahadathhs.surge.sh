"use client";

import type React from "react";

import { downloadUrl, portfolioData } from "@/constant/terminal";
import { useEffect, useRef, useState } from "react";

interface Command {
  input: string;
  output: string[];
  timestamp: Date;
}

export default function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const typeWriter = async (text: string[], delay = 30): Promise<string[]> => {
    return new Promise((resolve) => {
      const result: string[] = [];
      let lineIndex = 0;
      let charIndex = 0;

      const type = () => {
        if (lineIndex < text.length) {
          if (charIndex < text[lineIndex].length) {
            if (!result[lineIndex]) result[lineIndex] = "";
            result[lineIndex] += text[lineIndex][charIndex];
            charIndex++;
            setTimeout(type, delay);
          } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(type, delay * 2);
          }
        } else {
          resolve(result);
        }
      };
      type();
    });
  };

  const executeCommand = (input: string): string[] => {
    const cmd = input.trim().toLowerCase();
    const args = cmd.split(" ");

    switch (args[0]) {
      case "help":
        return [
          "╭─────────────────────────────────────────────────────────╮",
          "│                    AVAILABLE COMMANDS                   │",
          "├─────────────────────────────────────────────────────────┤",
          "│ help            │ Show this help message               │",
          "│ skills          │ List my technical skills             │",
          "│ projects        │ Show my projects                     │",
          "│ open <project>  │ View project details                 │",
          "│ download cv     │ Download my resume                   │",
          "│ contact         │ Show contact information             │",
          "│ clear           │ Clear the terminal                   │",
          "│ whoami          │ Show information about me            │",
          "│ neofetch        │ Display system information           │",
          "│ ls              │ List directory contents              │",
          "│ pwd             │ Print working directory              │",
          "│ date            │ Show current date and time           │",
          "│ history         │ Show command history                 │",
          "╰─────────────────────────────────────────────────────────╯",
        ];

      case "skills":
        return [
          "🚀 TECHNICAL SKILLS",
          "═══════════════════",
          "",
          "💻 Programming Languages:",
          ...portfolioData.skills.slice(0, 5).map((skill) => `   ▸ ${skill}`),
          "",
          "🛠️  Frameworks & Tools:",
          ...portfolioData.skills.slice(5).map((skill) => `   ▸ ${skill}`),
          "",
          "📊 Proficiency Level: ████████████████████ 95%",
        ];

      case "projects":
        return [
          "📁 MY PROJECTS",
          "══════════════",
          "",
          ...portfolioData.projects.flatMap((project, index) => [
            `${index + 1}. ${project.name}`,
            `   Status: ${project.status === "completed" ? "✅ Completed" : "🚧 In Progress"}`,
            `   Tech: ${project.tech}`,
            "",
          ]),
          "💡 Use 'open <project-name>' to view details",
        ];

      case "open":
        if (args.length < 2) {
          return ["❌ Usage: open <project-name>"];
        }
        const projectName = args.slice(1).join("-");
        const project = portfolioData.projects.find(
          (p) => p.name === projectName
        );
        if (project) {
          return [
            "╭─────────────────────────────────────────────────────────╮",
            `│ PROJECT: ${project.name.toUpperCase().padEnd(44)} │`,
            "├─────────────────────────────────────────────────────────┤",
            `│ Overview: ${project.description.padEnd(42)} │`,
            `│ Technologies: ${project.tech.padEnd(38)} │`,
            `│ Status: ${project.status.padEnd(44)} │`,
            "╰─────────────────────────────────────────────────────────╯",
          ];
        }
        return [
          `❌ Project '${projectName}' not found. Use 'projects' to see available projects.`,
        ];

      case "download":
        if (args[1] === "cv") {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "Shahadath_Hossen_Sajib_Resume.pdf";
            link.click();
          }, 1500);
          return [
            "📥 Initiating download...",
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%",
            "✅ Resume downloaded successfully!",
            "📂 Check your downloads folder.",
          ];
        }
        return ["❌ Usage: download cv"];

      case "contact":
        return [
          "📞 CONTACT INFORMATION",
          "═════════════════════",
          "",
          `📧 Email:    ${portfolioData.contact.email}`,
          `💼 LinkedIn: ${portfolioData.contact.linkedin}`,
          `🐙 GitHub:   ${portfolioData.contact.github}`,
          `🌐 Website:  ${portfolioData.contact.website}`,
          "",
          "💬 Feel free to reach out for collaborations!",
        ];

      case "clear":
        setCommands([]);
        return [];

      case "whoami":
        return [
          "👨‍💻 SHAHADATH HOSSEN SAJIB",
          "═══════════════════════════",
          "",
          "🎯 Role: Backend Developer",
          "🌟 Passion: Building scalable applications",
          "🧠 Expertise: Modern web technologies",
          "💡 Mission: Solving complex problems with elegant solutions",
          "",
          "🚀 Always learning, always growing!",
        ];

      case "neofetch":
        return [
          "                   -`                    sajib@portfolio",
          "                  .o+`                   ─────────────────",
          "                 `ooo/                   OS: Portfolio Linux",
          "                `+oooo:                  Host: Developer Workstation",
          "               `+oooooo:                 Kernel: Node.js v20.0.0",
          "               -+oooooo+:                Uptime: Always online",
          "             `/:-:++oooo+:               Packages: npm, yarn, pnpm",
          "            `/++++/+++++++:              Shell: portfolio-terminal",
          "           `/++++++++++++++:             Resolution: Responsive",
          "          `/+++ooooooooo+++/             Theme: Dark Mode",
          "         ./ooosssso++osssssso+`          Icons: Lucide React",
          "        .oossssso-````/ossssss+`         Terminal: Custom React",
          "       -osssssso.      :ssssssso.        CPU: JavaScript Engine",
          "      :osssssss/        osssso+++.       Memory: Optimized",
          "     /ossssssss/        +ssssooo/-       ",
          "   `/ossssso+/:-        -:/+osssso+-     ",
          "  `+sso+:-`                 `.-/+oso:    ",
          " `++:.                           `-/+/   ",
          " .`                                 `/   ",
        ];

      case "ls":
        return [
          "total 8",
          "drwxr-xr-x  2 sajib sajib 4096 Dec 15 10:30 projects/",
          "drwxr-xr-x  2 sajib sajib 4096 Dec 15 10:30 skills/",
          "-rw-r--r--  1 sajib sajib 2048 Dec 15 10:30 resume.pdf",
          "-rw-r--r--  1 sajib sajib 1024 Dec 15 10:30 contact.txt",
          "-rw-r--r--  1 sajib sajib  512 Dec 15 10:30 README.md",
        ];

      case "pwd":
        return ["/home/sajib/portfolio"];

      case "date":
        return [new Date().toString()];

      case "history":
        return [
          "COMMAND HISTORY",
          "═══════════════",
          "",
          ...commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`),
        ];

      case "":
        return [];

      default:
        return [
          `bash: ${args[0]}: command not found`,
          "",
          "💡 Did you mean one of these?",
          "   • help - Show available commands",
          "   • skills - View my technical skills",
          "   • projects - Browse my projects",
        ];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setIsTyping(true);
    const timestamp = new Date();

    // Add to command history
    if (currentInput.trim() !== "clear") {
      setCommandHistory((prev) => [...prev, currentInput.trim()]);
    }

    const output = executeCommand(currentInput);

    if (currentInput.trim().toLowerCase() !== "clear") {
      // Add command immediately
      setCommands((prev) => [
        ...prev,
        { input: currentInput, output: [], timestamp },
      ]);

      // Type out the response
      if (output.length > 0) {
        const typedOutput = await typeWriter(output, 20);
        setCommands((prev) => {
          const newCommands = [...prev];
          newCommands[newCommands.length - 1].output = typedOutput;
          return newCommands;
        });
      }
    }

    setCurrentInput("");
    setHistoryIndex(-1);
    setIsTyping(false);

    // Auto scroll
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [commands, isTyping]);

  useEffect(() => {
    // Welcome message with ASCII art
    setCommands([
      {
        input: "",
        output: [
          "╭─────────────────────────────────────────────────────────╮",
          "│        Welcome to Sajib's Portfolio Terminal!          │",
          "│                                                         │",
          "│  ███████╗ █████╗      ██╗██╗██████╗                    │",
          "│  ██╔════╝██╔══██╗     ██║██║██╔══██╗                   │",
          "│  ███████╗███████║     ██║██║██████╔╝                   │",
          "│  ╚════██║██╔══██║██   ██║██║██╔══██╗                   │",
          "│  ███████║██║  ██║╚█████╔╝██║██████╔╝                   │",
          "│  ╚══════╝╚═╝  ╚═╝ ╚════╝ ╚═╝╚═════╝                    │",
          "│                                                         │",
          "│  Type 'help' to see available commands                 │",
          "│  Type 'neofetch' for system information                │",
          "╰─────────────────────────────────────────────────────────╯",
          "",
        ],
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">
          sajib@portfolio: ~
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-[500px] p-4 overflow-y-auto bg-black text-green-400 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {commands.map((command, index) => (
          <div key={index} className="mb-1">
            {command.input && (
              <div className="flex items-center">
                <span className="text-blue-400 font-bold">sajib@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-green-400 ml-1">{command.input}</span>
              </div>
            )}
            {command.output.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className="text-green-300 whitespace-pre-wrap pl-0"
              >
                {line}
              </div>
            ))}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center text-yellow-400">
            <span className="animate-pulse">●</span>
            <span className="ml-2">Processing command...</span>
          </div>
        )}

        {/* Current Input Line */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-blue-400 font-bold">sajib@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-1 bg-transparent border-none outline-none text-green-400 flex-1 font-mono"
              autoComplete="off"
              spellCheck="false"
              disabled={isTyping}
            />
            <span
              className={`text-green-400 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
            >
              ▋
            </span>
          </form>
        )}
      </div>
    </div>
  );
}
