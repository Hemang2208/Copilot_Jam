"use client"

import type React from "react"

import planets from "@/data/planets.json"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Ship, Building2, Package, Wind, Soup } from "lucide-react"

const typeIcon: Record<string, React.ElementType> = {
  room: Building2,
  oxygen: Wind,
  meal: Soup,
  gear: Package,
  transport: Rocket,
}

export function PlanetaryMarketplace() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-balance text-xl md:text-2xl font-semibold text-cyan-300">Planetary Marketplace</h2>
        <Badge variant="outline" className="border-cyan-400/40 text-cyan-200 bg-cyan-400/10">
          Cosmic Airbnb
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {planets.locations.map((loc) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{loc.planet}</h3>
                <p className="text-sm text-foreground/70">{loc.region}</p>
              </div>
              <Badge className="bg-emerald-500 text-black">Open</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {loc.listings.map((l, i) => {
                const Icon = typeIcon[l.type] ?? Ship
                return (
                  <Card key={`${loc.id}-${l.name}-${i}`} className="border-white/15 bg-white/5 backdrop-blur-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2">
                          <div className="rounded-md bg-cyan-400/10 p-1.5 text-cyan-300">
                            <Icon className="size-4" />
                          </div>
                          <h4 className="text-sm font-medium text-foreground">{l.name}</h4>
                        </div>
                        <span className="font-mono text-cyan-300">{l.credits}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-foreground/70">{l.details}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
