import { motion } from 'framer-motion'
import { GameState } from '@/lib/types'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useReducedMotionPref } from '@/hooks/use-pixel-motion'

interface PixelHUDProps {
  gameState: GameState
}

export function PixelHUD({ gameState }: PixelHUDProps) {
  const prefersReducedMotion = useReducedMotionPref()
  
  const poolPercentage = ((1000 - gameState.globalPoolRemaining) / 1000) * 100
  
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-slate-900/90 border-b-2 border-slate-700 font-mono"
      variants={pixelMotionVariants.fadeAndRise}
      initial="initial"
      animate="animate"
      transition={pixelTransitions.medium}
    >
      {/* Credits */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-amber-400 rounded-sm"></div>
        <span className="text-amber-300 text-sm font-bold">
          {gameState.credits.toLocaleString()}
        </span>
        <span className="text-amber-200/60 text-xs">CREDITS</span>
      </div>
      
      {/* Wealth */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
        <span className="text-yellow-300 text-sm font-bold">
          {gameState.wealth}
        </span>
        <span className="text-yellow-200/60 text-xs">$WEALTH</span>
      </div>
      
      {/* Daily Pool Progress */}
      <div className="flex items-center gap-2">
        <span className="text-emerald-200/60 text-xs">POOL</span>
        <div className="w-24 h-3 bg-slate-800 border border-slate-600 rounded-sm overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            style={{ width: `${poolPercentage}%` }}
            animate={!prefersReducedMotion ? { width: `${poolPercentage}%` } : undefined}
            transition={pixelTransitions.medium}
          />
        </div>
        <span className="text-emerald-300 text-xs font-bold">
          {gameState.globalPoolRemaining}
        </span>
      </div>
      
      {/* Shield Status */}
      <div className="flex items-center gap-2">
        {gameState.shieldExpiresAt && gameState.shieldExpiresAt > Date.now() ? (
          <motion.div 
            className="w-4 h-4 bg-blue-400 rounded-sm"
            animate={!prefersReducedMotion ? { opacity: [0.7, 1, 0.7] } : undefined}
            transition={pixelTransitions.breathing}
          />
        ) : (
          <div className="w-4 h-4 bg-slate-600 rounded-sm opacity-40"></div>
        )}
        <span className="text-blue-200/60 text-xs">SHIELD</span>
      </div>
    </motion.div>
  )
}