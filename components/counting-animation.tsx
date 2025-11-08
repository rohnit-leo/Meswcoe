"use client"

import { useEffect, useRef, useState } from "react"

interface CountingAnimationProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function CountingAnimation({ from, to, duration = 2000, suffix = "", prefix = "" }: CountingAnimationProps) {
  const [count, setCount] = useState(from)
  const nodeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let current = from
    const increment = (to - from) / (duration / 16)

    const animate = () => {
      current += increment
      if (current >= to) {
        setCount(to)
        if (animationRef.current) clearTimeout(animationRef.current)
      } else {
        setCount(Math.floor(current))
        animationRef.current = setTimeout(animate, 16)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
          observer.unobserve(nodeRef.current!)
        }
      },
      { threshold: 0.1 },
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current)
      if (nodeRef.current) observer.unobserve(nodeRef.current)
    }
  }, [from, to, duration])

  return (
    <div ref={nodeRef}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}
