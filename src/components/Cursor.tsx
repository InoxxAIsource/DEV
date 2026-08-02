'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { EASE, DUR } from '@/lib/motion'

/*
  A single trailing ring. It grows over anything marked data-cursor="hover"
  and over native interactive elements. Pointer-fine only — never on touch —
  and it never replaces the system cursor, so nothing becomes harder to click.
*/
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.35 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)')
    setEnabled(fine.matches)
    const onChange = () => setEnabled(fine.matches)
    fine.addEventListener('change', onChange)
    return () => fine.removeEventListener('change', onChange)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const el = e.target as HTMLElement | null
      setHot(!!el?.closest('a, button, [data-cursor="hover"]'))
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        opacity: visible ? (hot ? 1 : 0.55) : 0,
        scale: hot ? 1.9 : 1,
      }}
      transition={{ duration: DUR.fast, ease: EASE }}
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-5 w-5 rounded-full border border-current text-accent mix-blend-difference lg:block"
    />
  )
}
