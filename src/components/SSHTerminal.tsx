'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────── Terminal Types ──────────── */

interface TermLine {
  id: number
  type: 'input' | 'output' | 'error' | 'system' | 'ascii'
  content: string
}

/* ──────────── ASCII Art ──────────── */

const SAKURA_ASCII = `
    ░░░░        ░░░░        ░░░░
  ░░▓▓▓▓░░  ░░▓▓▓▓░░  ░░▓▓▓▓░░
 ░░▓▓▓▓▓▓░░▓▓▓▓▓▓░░▓▓▓▓▓▓░░
░░▓▓████▓▓▓▓████▓▓▓▓████▓▓░░
░░▓▓████▓▓▓▓████▓▓▓▓████▓▓░░
 ░░▓▓▓▓▓▓░░▓▓▓▓▓▓░░▓▓▓▓▓▓░░
  ░░▓▓▓▓░░  ░░▓▓▓▓░░  ░░▓▓▓▓░░
   ░░▓▓░░    ░░▓▓░░    ░░▓▓░░
    ░░░░      ░░░░      ░░░░
      ██        ██        ██`

const NEOFETCH_ASCII = `
    ▄▄▄▄▄▄       azlan@azlan.dev
   ██░░░░██      ──────────────
  ██░░▓▓░░██    OS: AzlanOS 1.0 (Sakura)
  ██░░▓▓░░██    Host: Portfolio Server
  ██░░░░░░██    Kernel: Next.js 16
   ██░░░░██      Shell: sakura-sh 0.1
    ██████       Terminal: azlan-term
   ██░░░░██      CPU: Brain @ 4.2 GHz
  ██░░▓▓░░██    Memory: Lots of RAM
  ██░░▓▓░░██    Uptime: Since 2023
   ██░░░░██      Skills: Python, C++, JS
    ▀▀▀▀▀▀       Theme: Sakura Pixel
`

const PIXEL_LANTERN = `
     ██
    ████
   ██████
   ██████
   ██████
    ████
     ██
     ██
    ████`

const PIXEL_MOUNTAIN = `
        ██
       ████
      ██████
     ████████
    ██████████
   ████████████
  ██████████████
 ████████████████
██████████████████`

/* ──────────── Command Handlers ──────────── */

const FILESYSTEM: Record<string, string> = {
  'about.txt': `AZLAN AHMED
============

Computer Engineering student at Vishwakarma Institute of Technology, Pune (2023-2027).

Strong foundations in full-stack development, data structures & algorithms, and systems programming. Experienced in building production-ready web applications with modern frameworks, cloud technologies, and AI integration.

Currently seeking software engineering internship opportunities.`,

  'skills.json': `{
  "languages": ["Python", "C", "C++", "JavaScript", "HTML", "CSS", "SQL"],
  "web": ["React", "Flask", "FastAPI", "Bootstrap", "p5.js", "WebSockets", "Leaflet.js", "Firebase"],
  "cloud": ["GCP", "Firebase Auth", "Firestore", "Git", "GitHub", "Docker"],
  "tools": ["VS Code", "Neovim", "Claude Code", "OpenClaw", "Hermes"],
  "os": ["Linux (apt-based)", "Windows", "Shell Scripting"],
  "core": ["DSA", "OOP", "DB Design", "Computer Networks", "Version Control", "Agile"]
}`,

  'projects.md': `# Projects

## HemaVision - Blood Analysis Web App
Tech: JavaScript, Firebase, JWT
- Component-based web app with modular design patterns
- Firebase Auth with JWT token management
- Firestore for real-time data sync, CI/CD via GitHub Pages

## Live DDoS Attack Map - Threat Intelligence Platform
Tech: FastAPI, PostgreSQL, WebSockets, Leaflet.js
- Real-time global DDoS attack tracking
- Interactive geolocation with live WebSocket streams
- PostgreSQL with optimized high-frequency ingestion queries

## Cryptography Visualizer - Algorithm Learning Tool
Tech: p5.js, JavaScript, HTML/CSS
- Step-by-step visualizations for 10+ crypto algorithms
- Glassmorphism UI with responsive layout
- Interactive tutorials with real-time parameter adjustments

## AI-Integrated Traffic Info System
Tech: Python, PINN Model, Machine Learning
- Real-time traffic prediction using Physics-Informed Neural Networks
- Intelligent routing based on live data and predictive modeling`,

  'contact.txt': `CONTACT
=======

Email:   azlanahmed211@gmail.com
GitHub:  github.com/azlanahmed
LinkedIn: linkedin.com/in/azlanahmed
LeetCode: leetcode.com/azlanahmed

Open to internship opportunities and collaborations!`,

  'education.txt': `EDUCATION
=========

Bachelor of Technology in Computer Engineering
Vishwakarma Institute of Technology, Pune
2023 - 2027

Relevant Coursework:
- Data Structures & Algorithms
- Object-Oriented Programming
- Database Management Systems
- Computer Networks
- Web Engineering
- Operating Systems
- Cryptography & Digital Forensics
- Compiler Design`,

  'certifications.txt': `CERTIFICATIONS
=============

[✓] Google Cloud Career Readiness Program
    Comprehensive cloud computing training

[✓] Python Programming Certification
    Advanced proficiency for data structures and web development

[✓] GitHub Certification
    Version control and collaborative development best practices`,

  'secret.txt': `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
   You found a secret file! 🌸
   
   There's more hidden on this site...
   Try the Konami code: ↑↑↓↓←→←→BA
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

  'README.md': `# Welcome to azlan.dev

This terminal lets you explore my portfolio
the old-fashioned way. Type 'help' to get started.

Hint: Try 'neofetch' for system info,
'lantern' or 'mountain' for pixel art,
or 'cat secret.txt' if you're curious...`,
}

const DIRECTORIES = ['~', '~/projects', '~/skills', '~/docs']

function processCommand(input: string): TermLine[] {
  const trimmed = input.trim()
  const parts = trimmed.split(/\s+/)
  const cmd = parts[0]?.toLowerCase()
  const args = parts.slice(1)
  const results: TermLine[] = []

  if (!trimmed) return results

  switch (cmd) {
    case 'help':
      results.push({
        id: Date.now(),
        type: 'output',
        content: `Available commands:

  help          Show this help message
  whoami        Who is Azlan?
  ls            List files and directories
  cat <file>    Read a file contents
  cd <dir>      Change directory (aesthetic only)
  pwd           Print working directory
  neofetch      Display system information
  date          Show current date/time
  echo <text>   Echo text back
  uname         System information
  uptime        How long this session has been running
  clear         Clear the terminal
  exit          Close the terminal
  sudo <cmd>    Try it... ;)
  game          Launch the secret game
  sakura        Display sakura blossom
  lantern       Display pixel lantern
  mountain      Display pixel mountain
  banner        Show AZLAN banner
  pixel         Show pixel art
  
Files: about.txt, skills.json, projects.md, contact.txt,
       education.txt, certifications.txt, secret.txt, README.md`,
      })
      break

    case 'whoami':
      results.push({
        id: Date.now(),
        type: 'output',
        content: 'azlan - Computer Engineering student, full-stack developer, and systems programmer. Currently building cool things at VIT Pune.',
      })
      break

    case 'ls': {
      const targetDir = args[0]
      if (targetDir === 'projects' || targetDir === '~/projects') {
        results.push({
          id: Date.now(),
          type: 'output',
          content: 'hema-vision/    ddos-attack-map/    crypto-viz/    traffic-system/',
        })
      } else if (targetDir === 'skills' || targetDir === '~/skills') {
        results.push({
          id: Date.now(),
          type: 'output',
          content: 'languages.json    web-frameworks.json    cloud-devops.json    tools.json    core.txt',
        })
      } else if (targetDir === 'docs' || targetDir === '~/docs') {
        results.push({
          id: Date.now(),
          type: 'output',
          content: 'README.md    certifications.txt    education.txt    secret.txt',
        })
      } else {
        results.push({
          id: Date.now(),
          type: 'output',
          content: `about.txt      skills.json    projects.md    contact.txt
education.txt  certifications.txt  secret.txt  README.md
projects/      skills/       docs/`,
        })
      }
      break
    }

    case 'cat': {
      const filename = args[0]
      if (!filename) {
        results.push({ id: Date.now(), type: 'error', content: 'cat: missing file operand' })
      } else if (filename === 'secret.txt') {
        results.push({ id: Date.now(), type: 'system', content: FILESYSTEM['secret.txt'] })
      } else if (FILESYSTEM[filename]) {
        results.push({ id: Date.now(), type: 'output', content: FILESYSTEM[filename] })
      } else {
        results.push({ id: Date.now(), type: 'error', content: `cat: ${filename}: No such file or directory` })
      }
      break
    }

    case 'cd': {
      const dir = args[0] || '~'
      if (DIRECTORIES.includes(dir) || dir === '~') {
        results.push({ id: Date.now(), type: 'system', content: `Changed directory to ${dir}` })
      } else {
        results.push({ id: Date.now(), type: 'error', content: `cd: ${dir}: No such directory` })
      }
      break
    }

    case 'pwd':
      results.push({ id: Date.now(), type: 'output', content: '/home/azlan' })
      break

    case 'neofetch':
      results.push({ id: Date.now(), type: 'ascii', content: NEOFETCH_ASCII })
      break

    case 'date':
      results.push({ id: Date.now(), type: 'output', content: new Date().toString() })
      break

    case 'echo':
      results.push({ id: Date.now(), type: 'output', content: args.join(' ') })
      break

    case 'uname':
      results.push({ id: Date.now(), type: 'output', content: 'AzlanOS 1.0.0-sakura x86_64 Next.js/16.1 TypeScript/5' })
      break

    case 'uptime': {
      const mins = Math.floor((Date.now() - sessionStart) / 60000)
      results.push({ id: Date.now(), type: 'output', content: `up ${mins} minute${mins !== 1 ? 's' : ''}, 1 user, load average: 0.${Math.floor(Math.random() * 99)}` })
      break
    }

    case 'clear':
      results.push({ id: Date.now(), type: 'system', content: '__CLEAR__' })
      break

    case 'exit':
      results.push({ id: Date.now(), type: 'system', content: '__EXIT__' })
      break

    case 'sudo': {
      const subCmd = args.join(' ')
      if (subCmd === 'rm -rf /' || subCmd === 'rm -rf /*') {
        results.push({ id: Date.now(), type: 'error', content: 'Nice try. This system is protected by sakura magic. 🌸' })
      } else if (subCmd === 'make me a sandwich') {
        results.push({ id: Date.now(), type: 'output', content: 'Okay, making you a pixel art sandwich...\n\n   ╔══╗\n   ║🥪║\n   ╚══╝\n   Done! Enjoy your digital sandwich.' })
      } else {
        results.push({ id: Date.now(), type: 'error', content: `sudo: ${subCmd || 'command'}: permission denied. Are you azlan?` })
      }
      break
    }

    case 'game':
      results.push({ id: Date.now(), type: 'system', content: '__GAME__' })
      break

    case 'sakura':
      results.push({ id: Date.now(), type: 'ascii', content: SAKURA_ASCII })
      break

    case 'lantern':
      results.push({ id: Date.now(), type: 'ascii', content: PIXEL_LANTERN })
      break

    case 'mountain':
      results.push({ id: Date.now(), type: 'ascii', content: PIXEL_MOUNTAIN })
      break

    case 'banner':
      results.push({ id: Date.now(), type: 'ascii', content: `╔══════════════════════════════════════╗\n║  ░█▀▀█ ░█▀▀▀ ░█ ░█▀▀█  AZLAN.DEV  ║\n║  ░█▄▄█ ░█▀▀▀ ░█ ░█▄▄█             ║\n║  ░█ ░█ ░█▄▄▄ ░█ ░█ ░█             ║\n╚══════════════════════════════════════╝` })
      break

    case 'pixel':
      results.push({ id: Date.now(), type: 'ascii', content: `░░░░░░░░░░░░░░░░░░░░░░░░░░\n░░ ██  ██  ██  ██  ██  ██ ░░\n░░                          ░░\n░░  ▄▄▄▄  ▄▄▄▄  ▄▄▄▄       ░░\n░░  ████  ████  ████  ██   ░░\n░░  ████  ████  ████  ██   ░░\n░░  ▀▀▀▀  ▀▀▀▀  ▀▀▀▀  ██   ░░\n░░                     ██   ░░\n░░  ░░░░  ░░░░  ░░░░       ░░\n░░░░░░░░░░░░░░░░░░░░░░░░░░` })
      break

    case 'rm':
      results.push({ id: Date.now(), type: 'error', content: 'rm: Operation not permitted. This filesystem is read-only.' })
      break

    case 'ping':
      results.push({ id: Date.now(), type: 'output', content: args[0] ? `PING ${args[0]} (127.0.0.1): 56 data bytes\n64 bytes: icmp_seq=0 ttl=64 time=0.${Math.floor(Math.random() * 9)}ms\n64 bytes: icmp_seq=1 ttl=64 time=0.${Math.floor(Math.random() * 9)}ms\n--- ${args[0]} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss` : 'ping: missing destination' })
      break

    case 'curl':
      results.push({ id: Date.now(), type: 'output', content: args[0] === 'azlan.dev' ? '<!-- Welcome to azlan.dev! Try the graphical version too -->\n<html><body><h1>AZLAN AHMED</h1><p>Computer Engineering Student</p></body></html>' : `curl: ${args[0] || 'no URL'}: Could not resolve host` })
      break

    case 'ssh':
      results.push({ id: Date.now(), type: 'output', content: 'You\'re already connected to azlan.dev! This IS the SSH session.' })
      break

    case 'vim':
    case 'nano':
    case 'emacs':
      results.push({ id: Date.now(), type: 'error', content: `${cmd}: editors are overrated. Real devs use echo and redirect. > file.txt` })
      break

    case 'apt':
    case 'npm':
    case 'pip':
      results.push({ id: Date.now(), type: 'error', content: `${cmd}: Package management disabled. This portfolio is already fully loaded.` })
      break

    default:
      results.push({ id: Date.now(), type: 'error', content: `${cmd}: command not found. Type 'help' for available commands.` })
  }

  return results
}

/* ──────────── Session Start Time ──────────── */

const sessionStart = Date.now()

/* ──────────── SSH Terminal Component ──────────── */

interface SSHTerminalProps {
  onClose: () => void
  onGame: () => void
}

export default function SSHTerminal({ onClose, onGame }: SSHTerminalProps) {
  const [lines, setLines] = useState<TermLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [connected, setConnected] = useState(false)
  const [booting, setBooting] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lineIdRef = useRef(0)

  const addLine = useCallback((type: TermLine['type'], content: string) => {
    const id = lineIdRef.current++
    setLines(prev => [...prev, { id, type, content }])
  }, [])

  // Boot sequence
  useEffect(() => {
    const bootLines: Array<{ content: string; delay: number; type: TermLine['type'] }> = [
      { content: 'Establishing SSH connection to azlan.dev...', delay: 200, type: 'system' },
      { content: 'SSH-2.0-sakura-sh-0.1', delay: 600, type: 'system' },
      { content: 'Key exchange: curve25519-sha256', delay: 900, type: 'system' },
      { content: 'Host key: ED25519 SHA256:4zL4n...sakura', delay: 1100, type: 'system' },
      { content: 'Authentication: publickey', delay: 1400, type: 'system' },
      { content: 'Authenticated to azlan.dev [134.0.0.42]:22', delay: 1700, type: 'system' },
      { content: '', delay: 1900, type: 'system' },
      { content: '  ╔═══════════════════════════════════════════╗', delay: 2000, type: 'ascii' },
      { content: '  ║                                           ║', delay: 2050, type: 'ascii' },
      { content: '  ║   Welcome to azlan.dev                    ║', delay: 2100, type: 'ascii' },
      { content: '  ║   ░█▀▀█ ░█▀▀▀ ░█ ░█▀▀█                  ║', delay: 2150, type: 'ascii' },
      { content: '  ║   ░█▄▄█ ░█▀▀▀ ░█ ░█▄▄█                  ║', delay: 2175, type: 'ascii' },
      { content: '  ║   ░█ ░█ ░█▄▄▄ ░█ ░█ ░█                  ║', delay: 2200, type: 'ascii' },
      { content: '  ║                                           ║', delay: 2225, type: 'ascii' },
      { content: '  ║   Type "help" to get started              ║', delay: 2250, type: 'ascii' },
      { content: '  ║   Type "exit" to disconnect               ║', delay: 2300, type: 'ascii' },
      { content: '  ║                                           ║', delay: 2350, type: 'ascii' },
      { content: '  ╚═══════════════════════════════════════════╝', delay: 2400, type: 'ascii' },
      { content: '', delay: 2500, type: 'system' },
    ]

    let totalDelay = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    bootLines.forEach(({ content, delay, type }) => {
      totalDelay += delay - (bootLines[0]?.delay || 0)
      const timer = setTimeout(() => {
        addLine(type, content)
      }, delay)
      timers.push(timer)
    })

    const finalTimer = setTimeout(() => {
      setBooting(false)
      setConnected(true)
    }, 2600)
    timers.push(finalTimer)

    return () => timers.forEach(clearTimeout)
  }, [addLine])

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  // Focus input
  useEffect(() => {
    if (connected && inputRef.current) {
      inputRef.current.focus()
    }
  }, [connected])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const input = currentInput.trim()
    if (!input && !currentInput) return

    // Add the input line
    addLine('input', `azlan@dev:~$ ${input}`)
    setCurrentInput('')

    if (input) {
      setCommandHistory(prev => [...prev, input])
      setHistoryIndex(-1)

      const results = processCommand(input)

      // Check for special commands
      for (const result of results) {
        if (result.content === '__CLEAR__') {
          setLines([])
          return
        }
        if (result.content === '__EXIT__') {
          addLine('system', 'Connection to azlan.dev closed.')
          setTimeout(onClose, 800)
          return
        }
        if (result.content === '__GAME__') {
          addLine('system', 'Launching sakura catch game...')
          setTimeout(onGame, 600)
          setTimeout(onClose, 600)
          return
        }
      }

      // Add output lines with slight delay for realism
      results.forEach((result, i) => {
        setTimeout(() => {
          addLine(result.type, result.content)
        }, i * 50)
      })
    }
  }, [currentInput, addLine, onClose, onGame])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion
      const partial = currentInput.trim()
      if (partial.startsWith('cat ')) {
        const partialFile = partial.slice(4)
        const match = Object.keys(FILESYSTEM).find(f => f.startsWith(partialFile))
        if (match) {
          setCurrentInput(`cat ${match}`)
        }
      } else {
        const commands = ['help', 'whoami', 'ls', 'cat', 'cd', 'pwd', 'neofetch', 'date', 'echo', 'uname', 'uptime', 'clear', 'exit', 'sudo', 'game', 'sakura', 'lantern', 'mountain', 'banner', 'pixel', 'ping', 'curl', 'ssh']
        const match = commands.find(c => c.startsWith(partial))
        if (match) {
          setCurrentInput(match)
        }
      }
    }
  }, [commandHistory, historyIndex, currentInput])

  const getLineColor = (type: TermLine['type']) => {
    switch (type) {
      case 'input': return 'text-[#C4A882]'
      case 'output': return 'text-[#D4C5B0]'
      case 'error': return 'text-[#E8B4B8]'
      case 'system': return 'text-[#8B7355]'
      case 'ascii': return 'text-[#E8B4B8]'
      default: return 'text-[#D4C5B0]'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2C2C2C]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Terminal window */}
      <div className="relative w-full max-w-3xl h-[85vh] max-h-[600px] flex flex-col border-2 border-[#4A4A4A] overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 0 1px #2C2C2C, 8px 8px 0px 0px rgba(139, 115, 85, 0.3)',
          fontFamily: 'var(--font-mono), "Courier New", monospace',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#2C2C2C] border-b border-[#4A4A4A] select-none flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Traffic lights - pixel art style */}
            <button onClick={onClose} className="w-2.5 h-2.5 bg-[#E8B4B8] hover:bg-[#D4919A] transition-colors" />
            <div className="w-2.5 h-2.5 bg-[#C4A882]" />
            <div className="w-2.5 h-2.5 bg-[#8B7355]" />
          </div>
          <div className="flex items-center gap-2">
            {/* Pixel art sakura in title bar */}
            <span className="text-[10px] text-[#E8B4B8]">&#x2588;&#x2588;</span>
            <span className="text-[10px] text-[#8B7355] tracking-wider">
              azlan@azlan.dev: ~  —  ssh
            </span>
            <span className="text-[10px] text-[#C4A882]">&#x2588;&#x2588;</span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto text-xs sm:text-sm leading-relaxed"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4A4A4A #1a1a1a' }}
        >
          {/* Pixel art decorative strip */}
          <div className="px-3 sm:px-4 pt-2 pb-0 select-none text-[8px] text-[#3a3a3a]">
            &#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;&#x2591;&#x2588;
          </div>

          <div className="px-3 sm:px-4 pt-2">
          {lines.map((line) => (
            <div key={line.id} className={`${getLineColor(line.type)} whitespace-pre-wrap break-words`}>
              {line.content}
            </div>
          ))}

          {/* Input line */}
          {connected && !booting && (
            <form onSubmit={handleSubmit} className="flex items-center mt-0.5">
              <span className="text-[#E8B4B8] mr-1">&#x2588;</span>
              <span className="text-[#8B7355] mr-0 flex-shrink-0">azlan@dev:~$&nbsp;</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#C4A882] caret-[#C4A882] text-xs sm:text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </form>
          )}

          {/* Blinking cursor when booting */}
          {booting && (
            <span className="inline-block w-2 h-4 bg-[#C4A882] animate-pulse" />
          )}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#2C2C2C] border-t border-[#4A4A4A] text-[9px] text-[#8B7355] select-none flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className={connected ? 'text-[#C4A882]' : 'text-[#E8B4B8]'}>
              {connected ? '●' : '○'} SSH
            </span>
            <span className="text-[#E8B4B8]">{String.fromCharCode(9608)}{String.fromCharCode(9608)}</span>
            <span>azlan@dev</span>
          </div>
          <div className="flex items-center gap-3">
            <span>utf-8</span>
            <span className="text-[#C4A882]">{String.fromCharCode(9608)}{String.fromCharCode(9608)}</span>
            <span>bash</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
