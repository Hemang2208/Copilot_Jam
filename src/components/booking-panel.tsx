"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { slugify } from "@/lib/constants"
import { NeonButton } from "@/components/neon-button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type BookingOptions = {
  travelers: number
  room: string
  oxygen: string[]
  transportClass: string
  departure: string
}

export function BookingPanel({
  planet,
}: {
  planet: {
    name: string
    options: {
      rooms: string[]
      oxygen: string[]
      transportClass: string[]
      departureWindows: string[]
      supplies?: string[]
    }
  }
}) {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingOptions>({
    travelers: 1,
    room: planet.options.rooms[0],
    oxygen: [],
    transportClass: planet.options.transportClass[0],
    departure: planet.options.departureWindows[0],
  })
  const [confirming, setConfirming] = useState(false)

  const toggleOxygen = (opt: string, checked: boolean) => {
    setBooking((b) => {
      const next = new Set(b.oxygen)
      if (checked) next.add(opt)
      else next.delete(opt)
      return { ...b, oxygen: Array.from(next) }
    })
  }

  const onConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      const payload = { planet: planet.name, ...booking }
      try {
        localStorage.setItem("booking", JSON.stringify(payload))
      } catch {}
      router.push(`/travel/${slugify(planet.name)}`)
    }, 1400)
  }

  return (
    <div className="mt-4 rounded-lg border border-cyan-400/30 bg-slate-900/70 p-4 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.2)]">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-cyan-200">Room Type</Label>
          <Select value={booking.room} onValueChange={(v) => setBooking((b) => ({ ...b, room: v }))}>
            <SelectTrigger className="mt-1 bg-slate-900/60 border-cyan-400/40 text-cyan-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {planet.options.rooms.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-cyan-200">Transport Class</Label>
          <Select
            value={booking.transportClass}
            onValueChange={(v) => setBooking((b) => ({ ...b, transportClass: v }))}
          >
            <SelectTrigger className="mt-1 bg-slate-900/60 border-cyan-400/40 text-cyan-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {planet.options.transportClass.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-cyan-200">Departure Window</Label>
          <Select value={booking.departure} onValueChange={(v) => setBooking((b) => ({ ...b, departure: v }))}>
            <SelectTrigger className="mt-1 bg-slate-900/60 border-cyan-400/40 text-cyan-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {planet.options.departureWindows.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-cyan-200">Travelers</Label>
          <Input
            type="number"
            min={1}
            value={booking.travelers}
            onChange={(e) => setBooking((b) => ({ ...b, travelers: Number(e.target.value) }))}
            className="mt-1 bg-slate-900/60 border-cyan-400/40 text-cyan-100"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-cyan-200">Oxygen Options</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {planet.options.oxygen.map((o) => {
            const checked = booking.oxygen.includes(o)
            return (
              <label
                key={o}
                className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-slate-900/50 p-2"
              >
                <Checkbox checked={checked} onCheckedChange={(v) => toggleOxygen(o, Boolean(v))} />
                <span className="text-sm">{o}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <NeonButton onClick={onConfirm} className="min-w-40">
          {confirming ? "Confirming..." : "Confirm Booking"}
        </NeonButton>
      </div>

      {confirming && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-lg border border-emerald-400/40 bg-slate-900/70 px-6 py-4 text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
          >
            Booking Confirmed — Preparing Itinerary…
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
