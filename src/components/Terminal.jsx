import { useEffect, useRef, useState } from "react";

export default function Terminal() {
  const [history, setHistory] = useState([
    "Ankita's Terminal v2.0",
    "Type 'help' for commands",
    "",
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const prompt = "ankita@terminal:~$";

  const commands = {
    help: () => [
      "Commands:",
      "help, clear, ls, pwd, whoami, date",
      "skills, projects, contact, resume",
      "github, linkedin, cowsay, matrix",
    ],
    
    clear: () => "__CLEAR__",
    echo: (args) => args.join(" ") || "",
    date: () => new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    whoami: () => "ankita",
    pwd: () => "/home/ankita",
    
    ls: () => [
      "Documents/  Projects/  Skills/  resume.pdf",
    ],
    
    skills: () => [
      "💻 Skills:",
      "• Languages: Python, JavaScript, TypeScript, C, C++",
      "• Web: React.js, Next.js, Node.js, Express.js, HTML, CSS", 
      "• AI/ML: TensorFlow, OpenCV, NLP, BERT, LLMs, Ollama",
      "• Tools: Git, Docker, FastAPI, MongoDB, MySQL",
    ],
    
    projects: () => [
      "🚀 Projects:",
      "• ThinkForge - AI debate platform (Perplexity Hackathon)",
      "• HackaTwin - Hackathon management system (MIT AI)",
      "• Recora - Privacy-first health assistant (Top 10/800+)",
      "• Ninja Meeting AI - Real-time transcription",
      "• Women Safety Analytics - CCTV anomaly detection",
    ],
    
    contact: () => [
      "📧 Contact:",
      "Email: 23052947@kiit.ac.in",
      "Phone: +91-6387953827",
      "Website: www.ankitarahi.xyz",
      "GitHub: ankitarahi1477", 
      "LinkedIn: ankitarahi1477",
    ],
    
    resume: () => {
      window.open("/resume/Resume.pdf", "_blank");
      return "Opening resume...";
    },
    
    github: () => {
      window.open("https://github.com/ankitarahi1477/", "_blank");
      return "Opening GitHub...";
    },
    
    linkedin: () => {
      window.open("https://www.linkedin.com/in/ankitarahi1477/", "_blank");
      return "Opening LinkedIn...";
    },
    
    cowsay: (args) => {
      const text = args.join(" ") || "Hello!";
      return [
        ` ${"_".repeat(text.length + 2)}`,
        `< ${text} >`,
        ` ${"-".repeat(text.length + 2)}`,
        "    \\   ^__^",
        "     \\  (oo)\\_______",
        "        (__)\\       )\\/\\",
        "            ||----w |",
      ];
    },
    
    matrix: () => [
      "01001000 01100101 01101100 01101100 01101111",
      "Wake up, Neo...",
    ],
  };

  const runCommand = (raw) => {
    const line = raw.trim();
    const fullPrompt = `${prompt} ${line}`;
    
    if (!line) {
      setHistory((h) => [...h, fullPrompt]);
      return;
    }

    setCommandHistory((prev) => [...prev, line]);
    setHistoryIndex(-1);

    const [cmd, ...args] = line.split(/\s+/);
    const fn = commands[cmd];
    
    if (!fn) {
      setHistory((h) => [
        ...h,
        fullPrompt,
        `Command '${cmd}' not found. Type 'help'`,
        "",
      ]);
      return;
    }
    
    const out = fn(args);
    if (out === "__CLEAR__") {
      setHistory([]);
      return;
    }
    
    const lines = Array.isArray(out) ? out : [out];
    setHistory((h) => [...h, fullPrompt, ...lines, ""]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div className="w-full h-full bg-black text-green-400 font-mono text-xs sm:text-sm p-2 sm:p-4 overflow-auto">
      <div className="min-h-full">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-5 sm:leading-6 break-all sm:break-words">
            {line}
          </div>
        ))}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
          <span className="text-green-500 font-bold text-xs sm:text-sm shrink-0">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 min-w-0 bg-transparent outline-none caret-green-400 text-green-300 text-xs sm:text-sm"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
