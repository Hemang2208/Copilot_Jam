"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { NeonButton } from "@/components/neon-button" // Updated import path

type SimpleSkill = {
  name: string
  description: string
  duration: string
  license: string
  cost: string
}

export function SkillCard({
  skill,
  onLearn,
}: {
  skill: SimpleSkill
  onLearn?: () => void
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="h-full border-cyan-500/20 bg-background/40 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-pretty text-base text-cyan-300">{skill.name}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-cyan-300">{skill.duration}</span>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-300">{skill.license}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed">{skill.description}</p>
          <div className="flex items-center justify-between pt-2">
            <div className="text-cyan-300 text-sm font-medium">{skill.cost}</div>
            <NeonButton onClick={onLearn}>Learn</NeonButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
