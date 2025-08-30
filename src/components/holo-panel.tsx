"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type HoloPanelProps = {
  children: React.ReactNode
  className?: string
}

export function HoloPanel({ children, className }: HoloPanelProps) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0.0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-xl border bg-background/40 p-5",
        "border-cyan-500/20 shadow-[0_0_40px_-10px_rgba(34,211,238,0.35)]",
        "backdrop-blur supports-[backdrop-filter]:bg-background/30",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
      {children}
    </motion.div>
  )
}
