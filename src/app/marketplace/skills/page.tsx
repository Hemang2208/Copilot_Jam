"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SkillCard } from "@/components/skill-card"
import { LearningOverlay } from "@/components/learning-overlay"
import { SuccessPanel } from "@/components/success-panel"
import { MOCK_SKILLS } from "@/lib/constants"

export default function SkillsPage() {
  const [isLearning, setIsLearning] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [learnedSkills, setLearnedSkills] = useState<string[]>([]);

  // Load learned skills from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("learnedSkills");
      if (saved) setLearnedSkills(JSON.parse(saved));
    } catch {}
  }, []);

  // Save learned skills to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem("learnedSkills", JSON.stringify(learnedSkills));
    } catch {}
  }, [learnedSkills]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e7490] text-cyan-100"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MOCK_SKILLS.map((s) => {
            const alreadyLearned = learnedSkills.includes(s.name);
            return (
              <motion.div className={"text-white " + (alreadyLearned ? "opacity-60" : "cursor-pointer")}
                key={s.name} variants={item}>
                <SkillCard
                  skill={s}
                  onLearn={alreadyLearned ? undefined : () => {
                    setCurrentSkill(s.name)
                    setIsLearning(true)
                    setShowSuccess(false)
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      <Footer />

      {isLearning && currentSkill && (
        <LearningOverlay
          skill={currentSkill}
          onComplete={() => {
            setIsLearning(false)
            setShowSuccess(true)
            setLearnedSkills((prev) => prev.includes(currentSkill) ? prev : [currentSkill!, ...prev]);
          }}
        />
      )}
      {showSuccess && <SuccessPanel message="Your license has been issued. Youre cleared to book travel." />}
    </motion.main>
  )
}
