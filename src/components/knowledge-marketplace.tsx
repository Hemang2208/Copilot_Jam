"use client"

import type React from "react"

import skills from "@/data/skills.json"
import { HexCard } from "./hex-card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Atom, Shield, Timer, Wallet } from "lucide-react"

const icons: Record<string, React.ElementType> = {
  Exploration: Atom,
  Civics: Shield,
  Engineering: Atom,
  Planetary: Shield,
}

export function KnowledgeMarketplace() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-balance text-xl md:text-2xl font-semibold text-cyan-300">Knowledge Marketplace</h2>
        <Badge variant="outline" className="border-emerald-400/30 text-emerald-200 bg-emerald-400/10">
          StarCredits
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => {
          const Icon = icons[s.category] ?? Atom
          return (
            <HexCard key={s.id} className="min-h-44">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-cyan-400/10 p-2 text-cyan-300">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-pretty font-semibold text-foreground">{s.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className="border-white/15 bg-white/5">
                      {s.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-foreground/70">
                      <Timer className="size-3.5" /> {s.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-foreground/70">
                      <Shield className="size-3.5" /> {s.license}
                    </span>
                    <Badge className="bg-emerald-500 text-black">{s.level}</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-1 text-cyan-300">
                  <Wallet className="size-4" />
                  <span className="font-mono">{s.credits}</span>
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-cyan-500 text-black hover:bg-cyan-400">Rent</Button>
                </motion.div>
              </div>
            </HexCard>
          )
        })}
      </div>
    </section>
  )
}
