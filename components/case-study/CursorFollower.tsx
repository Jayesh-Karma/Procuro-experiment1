'use client'
import { useEffect, useState } from 'react'

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="pointer-events-none rounded-full fixed top-0 left-0 z-50"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className="-translate-x-1/2 h-15 w-15 text-center text-xs -translate-y-1/2 bg-orange-500 text-white font-semibold rounded-full px-4 py-2 shadow-lg backdrop-blur-sm">
        OPEN STUDY
      </div>
    </div>
  )
}