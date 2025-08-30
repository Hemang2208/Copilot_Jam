"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { GenerateMe } from "@/components/generate-me"
import { KnowledgeMarketplace } from "@/components/knowledge-marketplace"
import { PlanetaryMarketplace } from "@/components/planetary-marketplace"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-[100svh]">
      <Starfield />

      {/* Use shared Navbar instead of custom header */}
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-14">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-balance text-2xl md:text-4xl font-semibold text-foreground"
        >
          Build your holographic identity and trade knowledge across the system.
        </motion.h1>
        <p className="mt-2 max-w-2xl text-pretty text-sm md:text-base text-foreground/70">
          No backend. No APIs. 100% frontend with mock data, ShadCN UI, and Framer Motion animations.
        </p>

        <Tabs defaultValue="generate" className="mt-8">
          <TabsList className="bg-white/5 backdrop-blur border border-white/10">
            <TabsTrigger value="generate">Generate Me</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Marketplace</TabsTrigger>
            <TabsTrigger value="planetary">Planetary Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <GenerateMe />
          </TabsContent>

          <TabsContent value="knowledge" className="mt-6">
            <KnowledgeMarketplace />
          </TabsContent>

          <TabsContent value="planetary" className="mt-6">
            <PlanetaryMarketplace />
          </TabsContent>
        </Tabs>
      </section>

      {/* Use shared Footer below */}
      <Footer />
    </main>
  )
}
