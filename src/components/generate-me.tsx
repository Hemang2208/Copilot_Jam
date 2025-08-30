"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProfileCard } from "./profile-card"
import { Sparkles } from "lucide-react"

const roles = [
  "Quantum Designer",
  "Orbital Cartographer",
  "AI Diplomat",
  "Terraforming Specialist",
  "Stellar Navigator",
  "Hyperspace Analyst",
]

function synthesizeName(seed: string) {
  const base = seed.trim() || "Nova"
  const tokens = ["Nova", "Astra", "Zenith", "Orion", "Lyra", "Vega", "Kaia", "Atlas", "Cyra"]
  const suffix = ["-X", " 7", " Prime", " .io", " ∑", " α", ""]
  const pick = (arr: string[]) => arr[Math.floor((base.length + arr.length) % arr.length)]
  return `${pick(tokens)} ${base.split(" ")[0]}${pick(suffix)}`
}

function synthesizeRole(seed: string) {
  if (!seed) return roles[0]
  const idx = (seed.length + seed.charCodeAt(0)) % roles.length
  return roles[idx]
}

export function GenerateMe() {
  const [text, setText] = useState("")
  const profile = useMemo(() => {
    const name = synthesizeName(text)
    const role = synthesizeRole(text)
    const description =
      text?.trim().length > 0
        ? text
        : "A curious explorer from 2070 crafting luminous futures across planets and protocols."
    return { name, role, description }
  }, [text])

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-balance text-xl md:text-2xl font-semibold text-cyan-300">Generate Me</h2>
        <Sparkles className="size-5 text-emerald-300" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="grid gap-4 md:grid-cols-[1fr,420px]"
      >
        <div className="space-y-3">
          <label htmlFor="me" className="text-sm text-foreground/80">
            Describe your future self (role, vibe, mission)
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="me"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Designing ethical AIs for interplanetary governance..."
              className="bg-white/5 border-white/10 focus-visible:ring-cyan-400"
            />
            <Button
              type="button"
              variant="default"
              onClick={() => setText(text.trim())}
              className="bg-cyan-500 text-black hover:bg-cyan-400"
            >
              Glow
            </Button>
          </div>

          <p className="text-xs text-foreground/60">
            No backend used. This is instant, client-side synthesis with mock logic.
          </p>
        </div>

        <ProfileCard
          name={profile.name}
          role={profile.role}
          description={profile.description}
          avatarUrl="/neon-avatar-hologram.png"
        />
      </motion.div>
    </section>
  )
}
