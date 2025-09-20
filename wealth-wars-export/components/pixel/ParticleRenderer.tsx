import { motion } from 'framer-motion'

interface ParticleRendererProps {
  particles: Array<{
    id: string
    x: number
    y: number
    type: 'credit' | 'wealth'
  }>
}

export function ParticleRenderer({ particles }: ParticleRendererProps) {
  return (
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
}