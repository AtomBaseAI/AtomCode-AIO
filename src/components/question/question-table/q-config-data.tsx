import {
  SignalHigh,
  SignalLow,
  SignalMedium,
  Terminal,
  Database,
  Braces,
  FileCode2,
  Gem
} from "lucide-react"

/** All languages the judge supports — keep in sync with runtime-registry. */
export const languages = [

  {
    value: "java",
    label: "Java",
    icon: Terminal,
  },
  {
    value: "cpp",
    label: "C++",
    icon: Terminal,
  },
  {
    value: "c",
    label: "C",
    icon: Terminal,
  },
  {
    value: "python",
    label: "Python",
    icon: Terminal,
  },
  {
    value: "sql",
    label: "SQL (SQLite)",
    icon: Database,
  },
  {
    value: "javascript",
    label: "JavaScript",
    icon: Braces,
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: FileCode2,
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: Gem,
  },
]
export const difficulties = [
  {
    label: "Easy",
    value: "easy",
    icon: SignalLow,

  },
  {
    label: "Medium",
    value: "medium",
    icon: SignalMedium,
  },
  {
    label: "Hard",
    value: "hard",
    icon: SignalHigh,
  }
]
