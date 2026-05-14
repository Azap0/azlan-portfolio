'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SSHTerminal from '@/components/SSHTerminal'

/* ──────────── Pixel Art SVG Components ──────────── */

function PixelSakura({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" className={className} style={style} fill="currentColor">
      <rect x="6" y="0" width="4" height="2" />
      <rect x="4" y="2" width="8" height="2" />
      <rect x="2" y="4" width="4" height="2" />
      <rect x="10" y="4" width="4" height="2" />
      <rect x="4" y="4" width="2" height="2" opacity="0.6" />
      <rect x="10" y="4" width="2" height="2" opacity="0.6" />
      <rect x="0" y="6" width="4" height="2" />
      <rect x="12" y="6" width="4" height="2" />
      <rect x="6" y="6" width="4" height="2" opacity="0.8" />
      <rect x="2" y="8" width="4" height="2" />
      <rect x="10" y="8" width="4" height="2" />
      <rect x="4" y="10" width="2" height="2" opacity="0.6" />
      <rect x="10" y="10" width="2" height="2" opacity="0.6" />
      <rect x="4" y="10" width="8" height="2" />
      <rect x="6" y="12" width="4" height="2" />
      <rect x="6" y="14" width="2" height="2" opacity="0.7" />
      <rect x="8" y="14" width="2" height="1" opacity="0.5" />
    </svg>
  )
}

function PixelDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} fill="currentColor">
      <rect x="3" y="0" width="2" height="1" />
      <rect x="2" y="1" width="4" height="1" />
      <rect x="1" y="2" width="6" height="1" />
      <rect x="0" y="3" width="8" height="2" />
      <rect x="1" y="5" width="6" height="1" />
      <rect x="2" y="6" width="4" height="1" />
      <rect x="3" y="7" width="2" height="1" />
    </svg>
  )
}

function PixelStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor">
      <rect x="5" y="0" width="2" height="2" />
      <rect x="5" y="4" width="2" height="4" />
      <rect x="0" y="5" width="4" height="2" />
      <rect x="8" y="5" width="4" height="2" />
      <rect x="1" y="1" width="2" height="2" />
      <rect x="9" y="1" width="2" height="2" />
      <rect x="1" y="9" width="2" height="2" />
      <rect x="9" y="9" width="2" height="2" />
    </svg>
  )
}

function PixelHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor">
      <rect x="1" y="1" width="2" height="2" />
      <rect x="3" y="0" width="2" height="1" />
      <rect x="5" y="1" width="2" height="2" />
      <rect x="7" y="0" width="2" height="1" />
      <rect x="9" y="1" width="2" height="2" />
      <rect x="1" y="3" width="2" height="2" />
      <rect x="3" y="2" width="2" height="2" />
      <rect x="5" y="3" width="2" height="2" />
      <rect x="7" y="2" width="2" height="2" />
      <rect x="9" y="3" width="2" height="2" />
      <rect x="0" y="5" width="2" height="2" />
      <rect x="2" y="5" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="6" y="4" width="2" height="2" />
      <rect x="8" y="5" width="2" height="2" />
      <rect x="10" y="5" width="2" height="2" />
      <rect x="2" y="7" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="8" y="7" width="2" height="2" />
      <rect x="4" y="8" width="2" height="2" />
      <rect x="6" y="8" width="2" height="2" />
      <rect x="5" y="9" width="2" height="2" />
    </svg>
  )
}

function PixelDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-8">
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4C5B0] to-[#D4C5B0]" />
      <PixelDiamond className="w-3 h-3 text-[#E8B4B8]" />
      <div className="w-1 h-1 bg-[#8B7355]" />
      <PixelDiamond className="w-3 h-3 text-[#C4A882]" />
      <div className="w-1 h-1 bg-[#8B7355]" />
      <PixelDiamond className="w-3 h-3 text-[#E8B4B8]" />
      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4C5B0] to-[#D4C5B0]" />
    </div>
  )
}

function PixelCornerDecoration({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClasses = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }
  const rotation = {
    tl: 'rotate(0deg)',
    tr: 'rotate(90deg)',
    bl: 'rotate(270deg)',
    br: 'rotate(180deg)',
  }
  return (
    <div className={`absolute ${posClasses[position]} w-4 h-4 opacity-40`} style={{ transform: rotation[position] }}>
      <svg viewBox="0 0 16 16" fill="currentColor" className="text-[#C4A882]">
        <rect x="0" y="0" width="16" height="2" />
        <rect x="0" y="0" width="2" height="16" />
        <rect x="2" y="2" width="4" height="2" opacity="0.5" />
        <rect x="2" y="2" width="2" height="4" opacity="0.5" />
      </svg>
    </div>
  )
}

/* ──────────── Falling Petals Component ──────────── */

function FallingPetals() {
  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${8 + Math.random() * 10}s`,
    size: 8 + Math.random() * 12,
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.left,
            animation: `petal-fall ${petal.duration} ${petal.delay} infinite linear`,
            top: '-20px',
          }}
        >
          <PixelSakura className="text-[#E8B4B8] opacity-40" style={{ width: petal.size, height: petal.size }} />
        </div>
      ))}
    </div>
  )
}

/* ──────────── Section Wrapper with Animation ──────────── */

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ──────────── Pixel Art Card Component ──────────── */

function PixelCard({ children, className, accent = 'sakura' }: { children: React.ReactNode; className?: string; accent?: 'sakura' | 'matcha' | 'ink' }) {
  const accentColors = {
    sakura: 'border-l-[#E8B4B8] hover:border-l-[#D4919A]',
    matcha: 'border-l-[#8B7355] hover:border-l-[#6B5743]',
    ink: 'border-l-[#2C2C2C] hover:border-l-[#1A1A1A]',
  }

  return (
    <div className={`relative bg-white/80 backdrop-blur-sm border border-[#D4C5B0] border-l-4 ${accentColors[accent]} p-5 sm:p-6 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#D4C5B0] hover:-translate-y-0.5 ${className}`}>
      <PixelCornerDecoration position="tl" />
      <PixelCornerDecoration position="br" />
      {children}
    </div>
  )
}

/* ──────────── SECRET: Sakura Catch Mini-Game ──────────── */

interface GamePetal {
  id: number
  x: number
  y: number
  speed: number
  size: number
  caught: boolean
  color: string
}

const PETAL_COLORS = ['#E8B4B8', '#D4919A', '#F2D7D9', '#C4A882', '#8B7355']

function SakuraCatchGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'done'>('intro')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [petals, setPetals] = useState<GamePetal[]>([])
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('sakura-catch-high')
      return saved ? parseInt(saved, 10) : 0
    } catch { return 0 }
  })
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const gameRef = useRef<HTMLDivElement>(null)
  const petalIdRef = useRef(0)
  const scoreRef = useRef(0)

  useEffect(() => {
    if (gameState !== 'playing') return
    scoreRef.current = score
  }, [score, gameState])

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('done')
          clearInterval(timer)
          const finalScore = scoreRef.current
          try {
            const saved = localStorage.getItem('sakura-catch-high') || '0'
            const best = parseInt(saved, 10)
            if (finalScore > best) {
              localStorage.setItem('sakura-catch-high', String(finalScore))
              setHighScore(finalScore)
            } else {
              setHighScore(best)
            }
          } catch { /* noop */ }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameState])

  // Spawn petals
  useEffect(() => {
    if (gameState !== 'playing') return
    const spawner = setInterval(() => {
      const newPetal: GamePetal = {
        id: petalIdRef.current++,
        x: 10 + Math.random() * 80,
        y: -5,
        speed: 0.8 + Math.random() * 1.2,
        size: 20 + Math.random() * 20,
        caught: false,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      }
      setPetals(prev => [...prev, newPetal])
    }, 600)
    return () => clearInterval(spawner)
  }, [gameState])

  // Move petals
  useEffect(() => {
    if (gameState !== 'playing') return
    const mover = setInterval(() => {
      setPetals(prev =>
        prev
          .map(p => p.caught ? p : { ...p, y: p.y + p.speed })
          .filter(p => p.y < 110 && !p.caught)
      )
    }, 50)
    return () => clearInterval(mover)
  }, [gameState])

  const catchPetal = useCallback((id: number) => {
    setPetals(prev => prev.map(p => p.id === id ? { ...p, caught: true } : p))
    setCombo(prev => {
      const newCombo = prev + 1
      if (newCombo >= 3) {
        setShowCombo(true)
        setTimeout(() => setShowCombo(false), 800)
      }
      return newCombo
    })
    setScore(prev => {
      const comboMultiplier = combo >= 5 ? 3 : combo >= 3 ? 2 : 1
      return prev + comboMultiplier
    })
    // Remove caught petal after animation
    setTimeout(() => {
      setPetals(prev => prev.filter(p => p.id !== id))
    }, 200)
  }, [combo])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setPetals([])
    setCombo(0)
    petalIdRef.current = 0
    scoreRef.current = 0
    setGameState('playing')
  }

  const monoFont = { fontFamily: 'var(--font-mono), monospace' }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2C2C2C]/60 backdrop-blur-sm" />

      {/* Game container */}
      <div className="relative w-full max-w-md" style={monoFont}>
        {/* Pixel border frame */}
        <div className="bg-[#FAFAF8] border-2 border-[#2C2C2C] relative overflow-hidden"
          style={{ boxShadow: '6px 6px 0px 0px #8B7355' }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <PixelSakura className="w-3 h-3 text-[#E8B4B8]" />
              <span className="text-xs tracking-wider">SAKURA CATCH</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#C4A882] hover:text-[#FAFAF8] text-xs border border-[#C4A882] px-1.5 py-0.5 hover:bg-[#8B7355] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Game area */}
          {gameState === 'intro' && (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-4"
              >
                <PixelSakura className="w-12 h-12 text-[#E8B4B8] mx-auto" />
              </motion.div>
              <h3 className="text-lg text-[#2C2C2C] mb-2">Catch the Sakura</h3>
              <p className="text-xs text-[#8B7355] mb-1">Click falling petals to catch them</p>
              <p className="text-xs text-[#8B7355] mb-4">Chain catches for combo multiplier!</p>
              {highScore > 0 && (
                <p className="text-xs text-[#C4A882] mb-4">Best: {highScore}</p>
              )}
              <button
                onClick={startGame}
                className="px-6 py-2 bg-[#2C2C2C] text-[#FAFAF8] text-sm hover:bg-[#8B7355] transition-colors border-2 border-[#2C2C2C] hover:border-[#8B7355]"
              >
                Start
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div ref={gameRef} className="relative h-80 bg-gradient-to-b from-[#FAFAF8] to-[#F2D7D9]/30 overflow-hidden select-none">
              {/* HUD */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-[#FAFAF8]/80 backdrop-blur-sm border-b border-[#D4C5B0] z-10">
                <div className="flex items-center gap-1">
                  <PixelHeart className="w-3 h-3 text-[#E8B4B8]" />
                  <span className="text-xs text-[#2C2C2C]">{score}</span>
                </div>
                {combo >= 3 && (
                  <span className="text-xs text-[#E8B4B8] animate-pulse">x{combo >= 5 ? 3 : 2} COMBO</span>
                )}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8B7355]">{timeLeft}s</span>
                </div>
              </div>

              {/* Timer bar */}
              <div className="absolute top-[30px] left-0 right-0 h-1 bg-[#D4C5B0]">
                <div
                  className="h-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${(timeLeft / 30) * 100}%`,
                    backgroundColor: timeLeft > 10 ? '#C4A882' : '#E8B4B8',
                  }}
                />
              </div>

              {/* Petals */}
              {petals.map((petal) => (
                <button
                  key={petal.id}
                  className="absolute cursor-pointer hover:scale-125 transition-transform duration-100 focus:outline-none"
                  style={{
                    left: `${petal.x}%`,
                    top: `${petal.y}%`,
                    transform: `rotate(${petal.y * 3}deg)`,
                  }}
                  onClick={() => catchPetal(petal.id)}
                >
                  <PixelSakura
                    className="transition-opacity duration-200"
                    style={{ width: petal.size, height: petal.size, color: petal.color, opacity: petal.caught ? 0 : 0.9 }}
                  />
                </button>
              ))}

              {/* Combo popup */}
              <AnimatePresence>
                {showCombo && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1.2, opacity: 1, y: 0 }}
                    exit={{ scale: 1, opacity: 0, y: -20 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  >
                    <span className="text-2xl text-[#E8B4B8] tracking-widest" style={{ textShadow: '2px 2px 0px #2C2C2C' }}>
                      COMBO!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {gameState === 'done' && (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <PixelStar className="w-12 h-12 text-[#C4A882] mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg text-[#2C2C2C] mb-1">Time&apos;s Up!</h3>
              <p className="text-3xl text-[#2C2C2C] mb-1 font-light">{score}</p>
              <p className="text-xs text-[#8B7355] mb-1">petals caught</p>
              {score >= highScore && score > 0 && (
                <p className="text-xs text-[#E8B4B8] mb-3 tracking-wider">NEW BEST!</p>
              )}
              {score < highScore && (
                <p className="text-xs text-[#C4A882] mb-3">Best: {highScore}</p>
              )}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={startGame}
                  className="px-4 py-1.5 bg-[#2C2C2C] text-[#FAFAF8] text-xs hover:bg-[#8B7355] transition-colors"
                >
                  Retry
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 border border-[#D4C5B0] text-[#8B7355] text-xs hover:bg-[#F2D7D9] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────── Konami Code Hook ──────────── */

const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

function useKonamiCode(onActivate: () => void) {
  const indexRef = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_SEQUENCE[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          indexRef.current = 0
          onActivate()
        }
      } else {
        indexRef.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onActivate])
}

/* ──────────── Project Data ──────────── */

const projects = [
  {
    title: 'HemaVision',
    subtitle: 'Blood Analysis Web Application',
    tech: ['JavaScript', 'Firebase', 'JWT'],
    points: [
      'Architected component-based web application using vanilla JavaScript with modular design patterns for blood analysis visualization',
      'Implemented secure authentication system using Firebase Auth with JWT token management and sessionStorage for persistent user sessions',
      'Integrated Firestore for real-time data synchronization and deployed to GitHub Pages with automated CI/CD pipeline',
    ],
  },
  {
    title: 'Live DDoS Attack Map',
    subtitle: 'Real-Time Threat Intelligence Platform',
    tech: ['FastAPI', 'PostgreSQL', 'WebSockets', 'Leaflet.js'],
    points: [
      'Developed real-time global DDoS attack tracking system integrating Cloudflare and AbuseIPDB threat intelligence APIs',
      'Built interactive geolocation visualization using Leaflet.js with WebSocket connections for live attack stream updates',
      'Implemented PostgreSQL database with optimized queries for high-frequency data ingestion and historical attack pattern analysis',
    ],
  },
  {
    title: 'Cryptography Visualizer',
    subtitle: 'Interactive Algorithm Learning Tool',
    tech: ['p5.js', 'JavaScript', 'HTML/CSS'],
    points: [
      'Created step-by-step visualizations for 10+ cryptographic algorithms including RSA, AES, SHA-1, Diffie-Hellman, and classical ciphers',
      'Designed modern UI with glassmorphism effects, custom typography, and responsive layout for enhanced user experience',
      'Implemented interactive tutorials with real-time parameter adjustments to demonstrate encryption/decryption processes',
    ],
  },
  {
    title: 'AI-Integrated Traffic Info System',
    subtitle: 'Real-Time Traffic Prediction',
    tech: ['Python', 'PINN Model', 'Machine Learning'],
    points: [
      'Built real-time traffic flow prediction system using Physics-Informed Neural Networks (PINN) for route optimization',
      'Developed intelligent routing algorithm that maps quickest paths based on live traffic data and predictive modeling',
    ],
  },
]

const skillCategories = [
  { label: 'Languages', items: ['Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'SQL'], icon: '{ }' },
  { label: 'Web & Frameworks', items: ['React', 'Flask', 'FastAPI', 'Bootstrap', 'p5.js', 'WebSockets', 'Leaflet.js', 'Firebase', 'REST APIs'], icon: '</>' },
  { label: 'Cloud & DevOps', items: ['GCP', 'Firebase Auth', 'Firestore', 'Git', 'GitHub', 'Docker'], icon: '☁' },
  { label: 'Tools & IDEs', items: ['VS Code', 'Neovim', 'Claude Code', 'OpenClaw', 'Hermes', 'GNU Stow'], icon: '⚙' },
  { label: 'Operating Systems', items: ['Linux', 'Windows', 'Shell Scripting', 'CLI'], icon: '⊞' },
  { label: 'Core', items: ['DSA', 'OOP', 'DB Design', 'Networks', 'Version Control', 'Agile'], icon: '✦' },
]

const certifications = [
  'Google Cloud Career Readiness Program — Comprehensive cloud computing training',
  'Python Programming Certification — Advanced proficiency for data structures and web development',
  'GitHub Certification — Version control and collaborative development best practices',
]

const leadership = [
  'Technical Volunteer — Organized college tech fests and coding competitions',
  'Web Development Contributor — Created and maintained responsive web pages for college clubs and technical societies',
]

/* ──────────── Main Page ──────────── */

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [secretGame, setSecretGame] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)

  const activateSecret = useCallback(() => {
    setSecretGame(true)
  }, [])

  useKonamiCode(activateSecret)

  return (
    <div className="min-h-screen flex flex-col relative font-[var(--font-inter)]" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      {/* Falling Sakura Petals */}
      <FallingPetals />

      {/* Secret Game */}
      <AnimatePresence>
        {secretGame && <SakuraCatchGame onClose={() => setSecretGame(false)} />}
      </AnimatePresence>

      {/* SSH Terminal */}
      <AnimatePresence>
        {showTerminal && <SSHTerminal onClose={() => setShowTerminal(false)} onGame={() => setSecretGame(true)} />}
      </AnimatePresence>

      {/* Floating Terminal Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => setShowTerminal(true)}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#2C2C2C] border-2 border-[#4A4A4A] hover:border-[#C4A882] flex items-center justify-center transition-colors group"
        style={{ boxShadow: '3px 3px 0px 0px #8B7355' }}
        title="Open Terminal"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#C4A882] group-hover:text-[#E8B4B8] transition-colors" fill="currentColor">
          <rect x="1" y="2" width="14" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="4" y="6" width="2" height="2" />
          <rect x="7" y="6" width="2" height="2" />
          <rect x="4" y="9" width="5" height="1" />
        </svg>
      </motion.button>

      {/* Subtle washi paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #2C2C2C 0px, #2C2C2C 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #2C2C2C 0px, #2C2C2C 1px, transparent 1px, transparent 20px)`,
        }}
      />

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#D4C5B0]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium tracking-wide text-[#2C2C2C]" style={{ fontFamily: 'var(--font-mono), monospace' }}>AZLAN.DEV</span>
          <div className="flex items-center gap-4 text-xs text-[#8B7355]" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            <a href="#about" className="hover:text-[#2C2C2C] transition-colors">about</a>
            <a href="#skills" className="hover:text-[#2C2C2C] transition-colors">skills</a>
            <a href="#projects" className="hover:text-[#2C2C2C] transition-colors">work</a>
            <a href="#contact" className="hover:text-[#2C2C2C] transition-colors">contact</a>
            <button onClick={() => setShowTerminal(true)} className="hover:text-[#2C2C2C] transition-colors border border-[#D4C5B0] px-2 py-0.5 hover:border-[#8B7355]">ssh</button>
          </div>
        </div>
      </nav>

      {/* ─── MAIN ─── */}
      <main className="flex-1 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* ── HERO ── */}
          <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 text-center relative">
            {/* Torii gate decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-40 sm:w-52 mb-8 relative"
            >
              <img
                src="/torii-gate.png"
                alt="Pixel art torii gate"
                className="w-full h-auto object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-[#C4A882]" />
                <PixelDiamond className="w-3 h-3 text-[#E8B4B8]" />
                <div className="h-[1px] w-8 bg-[#C4A882]" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#2C2C2C] mb-3">
                AZLAN AHMED
              </h1>
              <p className="text-sm sm:text-base text-[#8B7355] tracking-widest uppercase font-light mb-6" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                Computer Engineering &bull; Software Developer
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-[#C4A882]" />
                <PixelDiamond className="w-3 h-3 text-[#C4A882]" />
                <div className="h-[1px] w-8 bg-[#C4A882]" />
              </div>
            </motion.div>

            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-4 flex-wrap text-xs" style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              <a href="mailto:azlanahmed211@gmail.com" className="px-3 py-1.5 border border-[#D4C5B0] text-[#8B7355] hover:bg-[#E8B4B8] hover:text-[#2C2C2C] hover:border-[#E8B4B8] transition-all duration-200">
                email
              </a>
              <a href="#" className="px-3 py-1.5 border border-[#D4C5B0] text-[#8B7355] hover:bg-[#E8B4B8] hover:text-[#2C2C2C] hover:border-[#E8B4B8] transition-all duration-200">
                github
              </a>
              <a href="#" className="px-3 py-1.5 border border-[#D4C5B0] text-[#8B7355] hover:bg-[#E8B4B8] hover:text-[#2C2C2C] hover:border-[#E8B4B8] transition-all duration-200">
                linkedin
              </a>
              <a href="#" className="px-3 py-1.5 border border-[#D4C5B0] text-[#8B7355] hover:bg-[#E8B4B8] hover:text-[#2C2C2C] hover:border-[#E8B4B8] transition-all duration-200">
                leetcode
              </a>
            </motion.div>
          </section>

          <PixelDivider />

          {/* ── ABOUT ── */}
          <section id="about" className="py-8">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#E8B4B8]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">About</h2>
              </div>
              <PixelCard accent="matcha">
                <p className="text-sm sm:text-base leading-relaxed text-[#4A4A4A]">
                  Computer Engineering student with strong foundations in full-stack development, data structures &amp; algorithms, and systems programming. Experienced in building production-ready web applications with modern frameworks, cloud technologies, and AI integration. Actively seeking software engineering internship opportunities to apply technical skills in real-world projects.
                </p>
              </PixelCard>
            </AnimatedSection>
          </section>

          {/* ── EDUCATION ── */}
          <section className="py-8">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#C4A882]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">Education</h2>
              </div>
              <div className="relative pl-6 border-l-2 border-[#D4C5B0]">
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-[#E8B4B8] border-2 border-[#FAFAF8]" />
                <PixelCard accent="sakura">
                  <h3 className="text-base sm:text-lg font-medium text-[#2C2C2C] mb-1">
                    Bachelor of Technology in Computer Engineering
                  </h3>
                  <p className="text-sm text-[#8B7355] mb-2" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                    Vishwakarma Institute of Technology, Pune &bull; 2023 – 2027
                  </p>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Relevant Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Web Engineering, Operating Systems, Cryptography, Digital Forensics, Web Development, Compiler Design
                  </p>
                </PixelCard>
              </div>
            </AnimatedSection>
          </section>

          <PixelDivider />

          {/* ── SKILLS ── */}
          <section id="skills" className="py-8">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#E8B4B8]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">Skills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map((cat, i) => (
                  <AnimatedSection key={cat.label} delay={i * 0.08}>
                    <PixelCard accent={i % 2 === 0 ? 'sakura' : 'matcha'} className="h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#C4A882] text-xs" style={{ fontFamily: 'var(--font-mono), monospace' }}>{cat.icon}</span>
                        <h3 className="text-sm font-medium text-[#2C2C2C]" style={{ fontFamily: 'var(--font-mono), monospace' }}>{cat.label}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 text-xs border border-[#D4C5B0] text-[#8B7355] hover:bg-[#F2D7D9] hover:text-[#2C2C2C] hover:border-[#E8B4B8] transition-all duration-200 cursor-default"
                            style={{ fontFamily: 'var(--font-mono), monospace' }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </PixelCard>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </section>

          <PixelDivider />

          {/* ── PROJECTS ── */}
          <section id="projects" className="py-8">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#C4A882]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">Projects</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-4">
              {projects.map((project, i) => (
                <AnimatedSection key={project.title} delay={i * 0.1}>
                  <PixelCard
                    accent={i % 3 === 0 ? 'sakura' : i % 3 === 1 ? 'matcha' : 'ink'}
                    className="group cursor-pointer"
                  >
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => setActiveProject(activeProject === i ? null : i)}
                    >
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#8B7355] mt-0.5" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                          {project.subtitle}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: activeProject === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#C4A882] mt-1 flex-shrink-0 ml-3"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <rect x="5" y="2" width="2" height="8" />
                          {activeProject !== i && <rect x="2" y="5" width="8" height="2" />}
                        </svg>
                      </motion.div>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs bg-[#F5F3F0] border border-[#D4C5B0] text-[#8B7355]"
                          style={{ fontFamily: 'var(--font-mono), monospace' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {activeProject === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2">
                            {project.points.map((point, j) => (
                              <li key={j} className="flex gap-2 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                                <PixelDiamond className="w-2 h-2 text-[#E8B4B8] mt-1.5 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </PixelCard>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <PixelDivider />

          {/* ── CERTIFICATIONS ── */}
          <section className="py-8">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#E8B4B8]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">Certifications</h2>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-3 px-4 py-3 bg-white/60 border border-[#D4C5B0] hover:bg-[#F2D7D9]/30 transition-colors">
                      <PixelDiamond className="w-2.5 h-2.5 text-[#C4A882] mt-1 flex-shrink-0" />
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">{cert}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* ── LEADERSHIP ── */}
          <section className="py-8">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <PixelStar className="w-4 h-4 text-[#C4A882]" />
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C]">Leadership</h2>
              </div>
              <div className="space-y-3">
                {leadership.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-3 px-4 py-3 bg-white/60 border border-[#D4C5B0] hover:bg-[#F2D7D9]/30 transition-colors">
                      <PixelSakura className="w-3 h-3 text-[#E8B4B8] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">{item}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </section>

          <PixelDivider />

          {/* ── CONTACT ── */}
          <section id="contact" className="py-12 sm:py-16 text-center">
            <AnimatedSection>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto w-24 sm:w-32 mb-6"
              >
                <img
                  src="/koi-fish.png"
                  alt="Pixel art koi fish"
                  className="w-full h-auto object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2C2C] mb-3">Get in Touch</h2>
              <p className="text-sm text-[#8B7355] mb-6" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                Open to internship opportunities and collaborations
              </p>
              <a
                href="mailto:azlanahmed211@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2C2C2C] text-[#FAFAF8] text-sm hover:bg-[#8B7355] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                <span>Say Hello</span>
                <PixelStar className="w-3 h-3 text-[#E8B4B8]" />
              </a>
            </AnimatedSection>
          </section>

          {/* ── Sakura Tree Decoration ── */}
          <div className="flex justify-center py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-48 sm:w-64"
            >
              <img
                src="/sakura-tree.png"
                alt="Pixel art sakura tree decoration"
                className="w-full h-auto object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </div>

        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-[#D4C5B0]/50 bg-[#FAFAF8]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PixelSakura className="w-3 h-3 text-[#E8B4B8]" />
            <span className="text-xs text-[#8B7355]" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              &copy; 2026 Azlan Ahmed
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-[#E8B4B8]" />
            <div className="w-1.5 h-1.5 bg-[#C4A882]" />
            <div className="w-1.5 h-1.5 bg-[#8B7355]" />
            <div className="w-1.5 h-1.5 bg-[#2C2C2C]" />
          </div>
        </div>
      </footer>
    </div>
  )
}
