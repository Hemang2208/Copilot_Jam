"use client"
import { motion } from "framer-motion"
import { Globe, Moon, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PlanetCard({
  name,
  icon = "globe",
  selected,
  onSelect,
}: {
  name: string
  icon?: "globe" | "moon" | "rocket"
  selected?: boolean
  onSelect?: () => void
}) {
  const Icon = icon === "moon" ? Moon : icon === "rocket" ? Rocket : Globe
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSelect}>
      <Card
        className={[
          "cursor-pointer bg-slate-900/60 backdrop-blur-md border-cyan-400/30",
          selected
            ? "shadow-[0_0_36px_rgba(34,211,238,0.35)] border-cyan-400"
            : "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
        ].join(" ")}
      >
        <CardHeader className="flex flex-row items-center gap-3">
          <Icon className="h-6 w-6 text-cyan-300" />
          <CardTitle className="text-cyan-300">{name}</CardTitle>
        </CardHeader>
        <CardContent className="text-cyan-100/80">Click to configure booking</CardContent>
      </Card>
    </motion.div>
  )
}
