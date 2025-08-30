"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function TravelPrompt({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [dest, setDest] = useState<string>("")
  const router = useRouter()

  function onConfirm() {
    if (!dest) return
    onOpenChange(false)
    router.push(`/travel/${dest}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/15 bg-white/10 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-balance">Choose your destination</DialogTitle>
          <DialogDescription>Select a planet or outpost to begin booking.</DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <Label htmlFor="destination">Destination</Label>
          <Select value={dest} onValueChange={setDest}>
            <SelectTrigger id="destination" className="bg-background/60">
              <SelectValue placeholder="Pick a destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mars">Mars — Valles Marineris</SelectItem>
              <SelectItem value="europa">Europa — Ice Shelf Zeta</SelectItem>
              <SelectItem value="titan">Titan — Kraken Mare</SelectItem>
              <SelectItem value="moon-base">Moon Base — Mare Tranquillitatis</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-50"
            disabled={!dest}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
