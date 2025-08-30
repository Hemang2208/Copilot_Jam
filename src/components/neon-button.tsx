"use client"

import type React from "react"
import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<typeof Button> & { glow?: "cyan" | "emerald" }

export const NeonButton = forwardRef<HTMLButtonElement, Props>(function NeonButton(
  { className, glow = "cyan", children, ...props },
  ref,
) {
  const glowClass =
    glow === "cyan"
      ? "shadow-[0_0_20px_rgba(34,211,238,0.35)] ring-cyan-400/60"
      : "shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-emerald-400/60"

  return (
    <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
      <Button
        ref={ref}
        {...props}
        className={cn(
          "relative ring-1 neon-button", // add animated class
          glowClass,
          "bg-white/5 hover:bg-white/10 border border-white/10",
          "text-foreground",
          className,
        )}
      >
        {children}
      </Button>
    </motion.div>
  )
})
