"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type HexCardProps = {
  children: React.ReactNode
  className?: string
}

export function HexCard({ children, className }: HexCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden p-4 md:p-6",
        // glassmorphism with neon ring
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-none",
        "shadow-[0_0_40px_-10px_rgba(34,211,238,0.35)]",
        // hexagon shape via clip-path
        "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]",
        "hover:shadow-[0_0_60px_-8px_rgba(34,211,238,0.6)] transition-shadow",
        className,
      )}
    >
      {/* gradient edge glow accent */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-emerald-400/10 to-transparent" />
      </div>
      {children}
    </motion.div>
  )
}
