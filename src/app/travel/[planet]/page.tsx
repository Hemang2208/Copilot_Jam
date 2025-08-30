"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import planetsData from "@/data/planets.json";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BoardingPass } from "@/components/boarding-pass";
import { HoloPanel } from "@/components/holo-panel";

type Booking = {
  passenger?: string;
  travelers?: number;
  transportClass?: string;
  room?: string;
  oxygen?: string[];
  departure?: string;
};

function toDisplayName(slug: string) {
  const s = slug.toLowerCase();
  if (s === "mars") return "Mars";
  if (s === "titan") return "Titan";
  if (s === "europa") return "Europa";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TravelPage() {
  const params = useParams();
  const planetSlug =
    typeof params.planet === "string"
      ? params.planet
      : Array.isArray(params.planet)
      ? params.planet[0]
      : "";
  const display = toDisplayName(planetSlug);
  const location = planetsData.locations.find(
    (loc) => loc.planet.toLowerCase() === display.toLowerCase()
  );
  const name = location?.planet ?? display;

  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("booking");
      if (raw) setBooking(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e7490] text-cyan-100">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <HoloPanel>
          <h2 className="text-balance text-2xl font-semibold">
            Travel — {name}
          </h2>
          <p className="text-sm text-cyan-300/80">
            Your itinerary and boarding details are below. All data is static
            and for demo purposes only.
          </p>
        </HoloPanel>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <BoardingPass
              planet={name}
              passenger={booking?.passenger || "A. Traveler"}
              seat={
                booking
                  ? `A${Math.max(1, Math.min(99, booking.travelers || 1))}`
                  : "A12"
              }
              gate="C-7"
              depart={booking?.departure || "2070-09-01 09:30 UTC"}
              code="ORB-2070-MAG"
            />
          </motion.div>
          <HoloPanel>
            <h3 className="text-lg font-semibold">Trip Summary</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Destination: {name}</li>
              <li>Travelers: {booking?.travelers ?? 1}</li>
              <li>Transport: {booking?.transportClass ?? "Explorer"}</li>
              <li>Room: {booking?.room ?? "Capsule"}</li>
              <li>
                Oxygen: {(booking?.oxygen || []).join(", ") || "Standard"}
              </li>
            </ul>
          </HoloPanel>
        </div>
      </section>
      <Footer />
    </main>
  );
}
