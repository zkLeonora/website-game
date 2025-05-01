'use client'
import { useRef, useEffect } from 'react'

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const stars: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }[] = []

    const createStar = () => {
      stars.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 + 2,
        speedY: Math.random() * 2 + 2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        s.x += s.speedX
        s.y += s.speedY

        if (s.x > canvas.width || s.y > canvas.height) {
          stars.splice(i, 1)
          i--
        }
      }
    }

    const animate = () => {
      draw()
      requestAnimationFrame(animate)
    }

    const interval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
          createStar()
        }
      }, 300)

    animate()

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default ShootingStars
