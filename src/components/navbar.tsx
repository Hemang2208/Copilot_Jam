"use client"

import Link from "next/link"
import { useState } from "react"
// import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Rocket, Sparkles, Map, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TravelPrompt } from "@/components/travel-prompt"

export function Navbar() {
  const [open, setOpen] = useState(false)
  // const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group inline-flex items-center gap-2">
          <Rocket className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300" />
          <span className="font-semibold tracking-wide">Orbital 2070</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2">
          <Button asChild variant="ghost" className="text-sm">
            <Link href="/generate" className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Generate
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-sm">
            <Link href="/marketplace/skills" className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              Skills
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-sm">
            <Link href="/marketplace/planets" className="inline-flex items-center gap-2">
              <Map className="h-4 w-4 text-emerald-400" />
              Planets
            </Link>
          </Button>
          <Button className="ml-2 bg-cyan-500 text-black hover:bg-cyan-400" onClick={() => setOpen(true)}>
            Book Travel
          </Button>
        </nav>
      </div>
      <TravelPrompt open={open} onOpenChange={setOpen} />
    </motion.header>
  )
}
