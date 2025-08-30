"use client"
import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"

export function LearningOverlay({
  skill,
  onComplete,
  durationMs = 3000,
}: {
  skill: string
  onComplete: () => void
  durationMs?: number
}) {
  useEffect(() => {
    const id = setTimeout(onComplete, durationMs)
    return () => clearTimeout(id)
  }, [onComplete, durationMs])

  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => i), [])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-cyan-400/40 bg-slate-900/70 p-6 text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.25)]">
        <h3 className="text-xl font-semibold text-cyan-300 text-center">Initializing: {skill}</h3>
        <div className="mt-4 h-2 w-full overflow-hidden rounded bg-cyan-400/20">
          <motion.div
            className="h-full bg-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-cyan-100/80">Uploading knowledge matrices...</p>

        <div className="pointer-events-none absolute inset-0">
          {particles.map((i) => {
            const angle = (i / particles.length) * Math.PI * 2
            const dx = Math.cos(angle) * 120
            const dy = Math.sin(angle) * 120
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/70"
                initial={{ x: 0, y: 0, opacity: 0.9 }}
                animate={{ x: dx, y: dy, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.4, ease: "easeOut" }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
