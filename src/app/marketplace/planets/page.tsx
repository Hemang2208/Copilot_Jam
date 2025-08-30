"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PlanetCard } from "@/components/planet-card"
import { BookingPanel } from "@/components/booking-panel"
import { MOCK_PLANETS } from "@/lib/constants"

export default function PlanetsPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <motion.main
      className="min-h-dvh"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PLANETS.map((p) => (
            <PlanetCard
              key={p.name}
              name={p.name}
              icon={p.icon}
              selected={selected === p.name}
              onSelect={() => setSelected(p.name)}
            />
          ))}
        </div>

        {selected && (
          <div className="mt-6">
            {MOCK_PLANETS.filter((p) => p.name === selected).map((planet) => (
              <BookingPanel key={planet.name} planet={planet} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </motion.main>
  )
}
