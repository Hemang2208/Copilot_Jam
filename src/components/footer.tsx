"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-16 border-t bg-background/60 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex items-center justify-center">
        <p className="text-pretty">
          © 2070 Orbital Travel Consortium — Built with Next.js, Tailwind, ShadCN, Framer Motion, and Lucide. All prices
          in StarCredits.
        </p>
      </div>
    </motion.footer>
  )
}
