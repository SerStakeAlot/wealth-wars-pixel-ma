import { useState } from 'react'
import { motion } from 'framer-motion'

interface ParticleProps {
  id: string
  x: number
  y: number
  type: 'credit' | 'wealth'
}

export function useParticleEmitter() {
  const [particles, setParticles] = useState<ParticleProps[]>([])
  
  const emit = (x: number, y: number, type: 'credit' | 'wealth' = 'credit', count: number = 3) => {
    const newParticles: ParticleProps[] = []
    
    for (let i = 0; i < Math.min(count, 12); i++) {
      const id = `${Date.now()}-${i}`
      newParticles.push({
        id,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 10,
        type
      })
    }
    
    setParticles(prev => [...prev.slice(-9), ...newParticles])
    
    // Auto cleanup
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 1500)
  }

  const ParticleRenderer = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute w-3 h-3 rounded-sm ${
            particle.type === 'credit' ? 'bg-amber-400' : 'bg-yellow-500'
          }`}
          style={{ left: particle.x, top: particle.y }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ 
            opacity: [1, 1, 0], 
            y: [-20, -40], 
            scale: [1, 0.8, 0.4] 
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
  )

  return { emit, ParticleRenderer }
}