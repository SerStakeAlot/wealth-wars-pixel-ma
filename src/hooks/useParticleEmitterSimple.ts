import { useState } from 'react'

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
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 1500)
  }

  const getParticleData = () => particles

  return { emit, getParticleData }
}