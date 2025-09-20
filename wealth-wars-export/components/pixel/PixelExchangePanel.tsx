import { motion } from 'framer-motion'
import { useState } from 'react'
import { GameState } from '@/lib/types'
import { PixelButton } from './PixelButton'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useSoundEvents } from '@/hooks/use-pixel-motion'

interface PixelExchangePanelProps {
  gameState: GameState
  onConvert: (amount: number) => void
}

export function PixelExchangePanel({ gameState, onConvert }: PixelExchangePanelProps) {
  const [convertAmount, setConvertAmount] = useState(75)
  const { play } = useSoundEvents()
  
  const maxConvertible = Math.min(
    Math.floor(gameState.credits / 75),
    gameState.globalPoolRemaining,
    10 - gameState.dailyWealthConverted
  )
  
  const handleConvert = () => {
    play('conversion')
    onConvert(convertAmount / 75)
  }
  
  const canConvert = maxConvertible > 0 && convertAmount <= gameState.credits
  
  return (
    <motion.div 
      className="bg-slate-800/90 border-2 border-slate-600 p-4 font-mono"
      variants={pixelMotionVariants.fadeAndRise}
      initial="initial"
      animate="animate"
      transition={pixelTransitions.medium}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
        <h3 className="text-emerald-300 text-sm font-bold">EXCHANGE POOL</h3>
      </div>
      
      <div className="space-y-3">
        {/* Exchange Rate Display */}
        <div className="text-xs text-slate-300 border border-slate-600 p-2 rounded">
          <div>Rate: 75 Credits = 1 $WEALTH</div>
          <div>Fee: 1% (retained)</div>
          <div className="text-emerald-300">Available: {maxConvertible} max</div>
        </div>
        
        {/* Amount Input */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="75"
            max={Math.min(gameState.credits, maxConvertible * 75)}
            step="75"
            value={convertAmount}
            onChange={(e) => setConvertAmount(Number(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-sm"
            disabled={!canConvert}
          />
          <div className="text-amber-300 text-xs font-bold min-w-[60px]">
            {convertAmount}
          </div>
        </div>
        
        {/* Conversion Preview */}
        <div className="text-xs text-slate-300 flex justify-between">
          <span>Convert:</span>
          <span className="text-yellow-300">{convertAmount / 75} $WEALTH</span>
        </div>
        
        {/* Convert Button */}
        <PixelButton
          variant="wealth"
          onClick={handleConvert}
          disabled={!canConvert}
          className="w-full"
        >
          CONVERT NOW
        </PixelButton>
        
        {/* Daily Limits Display */}
        <div className="text-xs text-slate-400 grid grid-cols-2 gap-2">
          <div>Your Daily: {gameState.dailyWealthConverted}/10</div>
          <div>Pool: {1000 - gameState.globalPoolRemaining}/1000</div>
        </div>
      </div>
    </motion.div>
  )
}