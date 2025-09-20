import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useReducedMotionPref } from '@/hooks/use-pixel-motion'

interface ParticleProps {
  id: string
  x: number
  y: number
  type: 'credit' | 'wealth'
  onComplete: () => void
}

function Particle({ id, x, y, type, onComplete }: ParticleProps) {
  const prefersReducedMotion = useReducedMotionPref()
  
  useEffect(() => {
    const timer = setTimeout(onComplete, prefersReducedMotion ? 100 : 1500)
    return () => clearTimeout(timer)
  }, [onComplete, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <motion.div
      key={id}
      className={`absolute w-3 h-3 pointer-events-none z-50 rounded-sm ${
        type === 'credit' ? 'bg-amber-400' : 'bg-yellow-500'
      }`}
      style={{ left: x, top: y }}
      variants={pixelMotionVariants.particleFloat}
      initial="initial"
      animate="animate"
      transition={pixelTransitions.lottery}
    />
  )
}

interface UseParticleEmitterOptions {
  maxParticles?: number
  particleLifetime?: number
}

export function useParticleEmitter(options: UseParticleEmitterOptions = {}) {
  const { maxParticles = 24, particleLifetime = 1500 } = options
  const [particles, setParticles] = useState<ParticleProps[]>([])
  
  const emit = (x: number, y: number, type: 'credit' | 'wealth' = 'credit', count: number = 3) => {
    const newParticles: ParticleProps[] = []
    
    for (let i = 0; i < Math.min(count, maxParticles); i++) {
      const id = `${Date.now()}-${i}`
      newParticles.push({
        id,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 10,
        type,
        onComplete: () => {
          setParticles(prev => prev.filter(p => p.id !== id))
        }
      })
    }
    
    setParticles(prev => [...prev.slice(-(maxParticles - newParticles.length)), ...newParticles])
  }

  const ParticleRenderer = () => (
    <>
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
    </>
  )

  return { emit, ParticleRenderer }
}