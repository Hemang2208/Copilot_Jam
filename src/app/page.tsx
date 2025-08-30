"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Starfield } from "@/components/starfield";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  const steps = [
    {
      title: "1. Generate Your Role",
      description:
        "Describe yourself and get assigned a unique interplanetary role.",
    },
    {
      title: "2. Learn New Skills",
      description:
        "Visit the Skills Marketplace to earn licenses for space travel.",
    },
    {
      title: "3. Book Your Planetary Journey",
      description: "Choose your destination and book your interplanetary trip.",
    },
    {
      title: "4. View Your Boarding Pass",
      description:
        "Access your itinerary and boarding details for your adventure.",
    },
  ];

  return (
    <motion.main
      className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e7490] overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Starfield />
      <Navbar />
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-emerald-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to the Interplanetary Travel Experience
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-cyan-100/90 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Embark on a futuristic journey: generate your role, learn new skills,
          book your trip, and explore the cosmos. Follow the steps below to
          begin your adventure!
        </motion.p>

        <Button
          onClick={() => router.push("/generate")}
          className="cursor-pointer text-bold mt-4 px-4 py-2 rounded-3xl bg-cyan-500 text-white hover:bg-cyan-600 transition"
        >
          Get Started
        </Button>

        <div className="mt-12 grid gap-8 md:grid-cols-2 w-full">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="rounded-xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-lg backdrop-blur-lg flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-2xl font-bold text-cyan-200 mb-2">
                {step.title}
              </div>
              <div className="text-cyan-100/80 mb-4">{step.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-cyan-300/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <span className="font-mono">Tip:</span> You can return to this page
          anytime to restart your journey or explore new roles and destinations.
        </motion.div>
      </section>
      <Footer />
    </motion.main>
  );
}
