"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function LearningSequence({
  onComplete,
  className,
  role = "Astronaut",
}: {
  onComplete?: () => void
  className?: string
  role?: string
}) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100)
        if (next >= 100) {
          clearInterval(id)
          setTimeout(() => onComplete?.(), 600)
        }
        return next
      })
    }, 450)
    return () => clearInterval(id)
  }, [onComplete])

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-white/5 border-white/10">
          Initializing HoloTutor
        </Badge>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>

      <motion.div
        className="relative rounded-xl p-4 bg-white/5 border border-white/10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
      >
        <div className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] pointer-events-none" />
        <p className="text-sm text-pretty">
          Uploading {role} protocols… calibrating neural link… rendering holographic modules…
        </p>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </motion.div>

      <AnimatePresence>
        {progress >= 100 && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-4 bg-white/5 border border-white/10 text-emerald-400"
          >
            <div className="font-medium">Skill link established. You are now a certified {role}.</div>
            <div className="text-xs text-emerald-300/80">
              License: Interplanetary Trade Authority • Valid: 2070-2075
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
