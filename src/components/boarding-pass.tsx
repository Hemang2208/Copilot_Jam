"use client";

import Image from "next/image";
import { HoloPanel } from "./holo-panel";
import { motion } from "framer-motion";

export function BoardingPass({
  planet,
  passenger = "A. Traveler",
  seat = "A12",
  gate = "C-7",
  depart = "2070-09-01 09:30 UTC",
  code = "ORB-2070-MAG",
}: {
  planet: string;
  passenger?: string;
  seat?: string;
  gate?: string;
  depart?: string;
  code?: string;
}) {
  return (
    <HoloPanel className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="md:col-span-2">
          <h3 className="text-balance text-xl font-semibold">
            Boarding Pass — {planet}
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Passenger</p>
              <p className="font-medium">{passenger}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Departure</p>
              <p className="font-medium">{depart}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gate</p>
              <p className="font-medium">{gate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Seat</p>
              <p className="font-medium">{seat}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded bg-white/5 p-4 text-center">
            <p className="font-mono text-sm tracking-widest text-cyan-300">
              {code}
            </p>
            <Image
              width={34}
              height={34}
              alt="Encoded QR"
              className="mt-2 h-24 w-24 opacity-80"
              src="/qr-code.png"
            />
          </div>
        </div>
      </motion.div>
    </HoloPanel>
  );
}
