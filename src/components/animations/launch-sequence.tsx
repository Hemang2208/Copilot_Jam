"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

export function LaunchSequence({
  active,
  children,
}: {
  active: boolean
  children?: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="launch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <div className="p-6">{children}</div>
          <motion.div
            className="absolute -bottom-8 inset-x-0 h-16 opacity-60 bg-gradient-to-t from-cyan-500/30 to-transparent"
            initial={{ y: 16 }}
            animate={{ y: -4 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
