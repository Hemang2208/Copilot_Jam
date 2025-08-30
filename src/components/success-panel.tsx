"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { NeonButton } from "@/components/neon-button"

export function SuccessPanel({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-lg border border-emerald-400/40 bg-slate-900/70 p-6 text-emerald-100 shadow-[0_0_32px_rgba(52,211,153,0.25)]">
        <h3 className="text-xl font-semibold text-emerald-300 text-center">Skill Upload Complete</h3>
        <p className="mt-2 text-center text-sm">{message}</p>
        <div className="mt-4 flex justify-center">
          <Link href="/marketplace/planets">
            <NeonButton className="border-emerald-400/50 text-emerald-100">Book Travel</NeonButton>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
