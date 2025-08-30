"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full border-t border-cyan-500/20 bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#0e7490]/60 backdrop-blur-lg shadow-[0_0_40px_0_rgba(34,211,238,0.15)] relative z-20"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 animate-pulse">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-glow">
            <circle cx="16" cy="16" r="14" stroke="#22d3ee" strokeWidth="2" fill="#0e7490" fillOpacity="0.2" />
            <circle cx="16" cy="16" r="6" fill="#22d3ee" className="animate-pulse" />
          </svg>
          <span className="text-cyan-300 font-bold tracking-widest text-lg font-mono glow-text">2070</span>
        </div>
        <p className="text-pretty text-cyan-100/80 text-center md:text-left">
          <span className="glow-text">© 2070 Orbital Travel Consortium</span> — Built with <span className="text-cyan-400">Next.js</span>, <span className="text-cyan-400">Tailwind</span>, <span className="text-cyan-400">ShadCN</span>, <span className="text-cyan-400">Framer Motion</span>, <span className="text-cyan-400">Teachable Machine</span>.<br className="hidden md:block" /> All prices in <span className="text-emerald-300 font-semibold">StarCredits</span>.
        </p>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-cyan-400/70 font-mono">The World of 2070</span>
          <span className="h-1 w-16 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 rounded-full animate-glow" />
        </div>
      </div>
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 8px #22d3ee, 0 0 16px #0e7490;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 16px #0e7490);
        }
        .animate-glow {
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 8px #22d3ee; }
          to { box-shadow: 0 0 24px #0e7490; }
        }
      `}</style>
    </motion.footer>
  )
}
