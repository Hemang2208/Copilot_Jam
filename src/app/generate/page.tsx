"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { NeonButton } from "@/components/neon-button";
import { ProfileCard } from "@/components/profile-card";

export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ input: string; role: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const ROLES = [
    "Quantum Navigator",
    "Terraforming Engineer",
    "Exo-Biologist",
    "Astro-Miner",
    "Vac-Suit Specialist",
  ];

  function mockGenerate(customInput?: string) {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const r = ROLES[Math.floor(Math.random() * ROLES.length)];
      setRole(r);
      setHistory((prev) => [
        { input: (customInput ?? input) || "No input provided", role: r },
        ...prev,
      ]);
      setLoading(false);
    }, 2000);
  }

  function handleCopy() {
    if (role) {
      navigator.clipboard.writeText(role).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    }
  }

  return (
    <motion.main
      className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e7490] text-cyan-100"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <form
          className="rounded-lg border border-cyan-400/30 bg-slate-900/80 p-4 backdrop-blur shadow-xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim().length < 10) {
              setError("Please describe yourself in at least 10 characters.");
              return;
            }
            mockGenerate();
          }}
        >
          <label className="text-sm text-cyan-200">Describe yourself</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-md border border-cyan-400/30 bg-slate-800/80 text-cyan-100 p-3 text-sm outline-none placeholder:text-cyan-400/60"
            placeholder="e.g., I love exploration, math puzzles, and zero-g gardening"
          />
          {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
          <div className="mt-3 flex gap-2 justify-end">
            <NeonButton
              className="text-white cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating" : "Generate"}
            </NeonButton>
            {role && !loading && (
              <NeonButton
                className="text-white cursor-pointer"
                type="button"
                glow="cyan"
                onClick={() => mockGenerate(input)}
              >
                Regenerate
              </NeonButton>
            )}
          </div>
        </form>

        {role && !loading && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <ProfileCard role={role} input={input || "No input provided"} />
              <button
                className="ml-2 px-2 py-1 rounded bg-cyan-700 text-xs text-white hover:bg-cyan-600 transition"
                onClick={handleCopy}
                type="button"
                title="Copy role to clipboard"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/marketplace/skills">
                <NeonButton
                  className="text-white cursor-pointer"
                  glow="emerald"
                >
                  Learn Skill of {role}
                </NeonButton>
              </Link>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="text-cyan-300 text-sm mb-2">History</h3>
            <ul className="space-y-2 text-xs">
              {history.map((h, i) => (
                <li
                  key={i}
                  className="bg-slate-800/80 rounded p-2 border border-cyan-400/10"
                >
                  <span className="font-semibold text-cyan-200">{h.role}</span>
                  <span className="ml-2 text-slate-300">({h.input})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <Footer />
    </motion.main>
  );
}
