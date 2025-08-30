"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

type Resource = {
  id: string
  title: string
  description: string
  price: number
  image: string
  rating?: number
  planetSlug?: string
}

export function ResourceCard({
  resource,
  planetSlug,
  cta = "Book",
}: { resource: Resource; planetSlug: string; cta?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="overflow-hidden border-emerald-500/20 bg-background/40 backdrop-blur">
        <div className="relative h-40 w-full">
          <Image
            src={resource.image || "/placeholder.svg?height=240&width=480&query=resource"}
            alt={resource.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-pretty text-base">{resource.title}</CardTitle>
          {resource.rating && <p className="text-xs text-muted-foreground">Rating {resource.rating.toFixed(1)}/5</p>}
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-cyan-300">{resource.price} StarCredits</p>
          <Button asChild size="sm" className="bg-emerald-500 text-black hover:bg-emerald-400">
            <Link href={`/travel/${planetSlug}`}>{cta}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
