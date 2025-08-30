"use client"

import { useEffect, useRef } from "react"

/**
 * Starfield Background Canvas
 * Colors used (keeping 3-5 total palette across app):
 * - Primary: cyan-400 (#22d3ee)
 * - Accent: emerald-400 (#34d399)
 * - Neutrals: bg-background, text-foreground
 */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const device = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    canvas.width = width * device
    canvas.height = height * device
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    ctx.scale(device, device)

    const STAR_COUNT = Math.floor((width * height) / 9000)
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.2 + Math.random() * 0.8,
      twinkle: Math.random(),
    }))

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height)
      // deep space background sweep
      const g = ctx.createLinearGradient(0, 0, 0, height)
      g.addColorStop(0, "rgba(2, 6, 23, 1)") // slate-950-ish
      g.addColorStop(1, "rgba(10, 15, 28, 1)") // deep space
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      for (const s of stars) {
        const size = s.z * 1.4
        const alpha = 0.5 + 0.5 * Math.sin((Date.now() * 0.002 + s.twinkle) % (Math.PI * 2))
        ctx.fillStyle = `rgba(34, 211, 238, ${0.6 * alpha})` // cyan-400 glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2)
        ctx.fill()

        // subtle emerald halo
        ctx.fillStyle = `rgba(52, 211, 153, ${0.25 * alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, size * 2.2, 0, Math.PI * 2)
        ctx.fill()

        // parallax drift
        s.y += 0.04 + s.z * 0.08
        if (s.y > height + 4) s.y = -4
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    function onResize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * device
      canvas.height = height * device
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.scale(device, device)
    }

    window.addEventListener("resize", onResize)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 opacity-80" />
}
