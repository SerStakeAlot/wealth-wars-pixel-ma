import { motion } from 'framer-motion'
import { useState } from 'react'
import { LotteryState } from '@/lib/types'
import { PixelButton } from './PixelButton'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useSoundEvents, useReducedMotionPref } from '@/hooks/use-pixel-motion'

interface PixelLotteryPanelProps {
  lotteryState: LotteryState
  wealth: number
  onEnterLottery: (tickets: number) => void
}

export function PixelLotteryPanel({ lotteryState, wealth, onEnterLottery }: PixelLotteryPanelProps) {
  const [ticketCount, setTicketCount] = useState(1)
  const { play } = useSoundEvents()
  const prefersReducedMotion = useReducedMotionPref()
  
  const maxTickets = Math.floor(wealth / 25)
  const ticketCost = ticketCount * 25
  const timeLeft = Math.max(0, lotteryState.drawsAt - Date.now())
  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)
  
  const handleEnter = () => {
    play('lottery-enter')
    onEnterLottery(ticketCount)
  }
  
  const canEnter = lotteryState.isActive && wealth >= ticketCost && ticketCount > 0

  return (
    <motion.div 
      className="bg-slate-800/90 border-2 border-slate-600 p-4 font-mono"
      variants={pixelMotionVariants.fadeAndRise}
      initial="initial"
      animate="animate"
      transition={pixelTransitions.medium}
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div 
          className="w-3 h-3 bg-yellow-400 rounded-sm"
          variants={pixelMotionVariants.lotteryPot}
          animate={!prefersReducedMotion && lotteryState.isActive ? "animate" : "initial"}
          transition={pixelTransitions.breathing}
        />
        <h3 className="text-yellow-300 text-sm font-bold">LOTTERY</h3>
      </div>
      
      <div className="space-y-3">
        {/* Current Pot Display */}
        <motion.div 
          className="text-center border-2 border-yellow-600 bg-yellow-900/20 p-3 rounded"
          variants={pixelMotionVariants.bumpScale}
          animate={lotteryState.currentPot > 0 ? "animate" : "initial"}
          transition={pixelTransitions.quick}
        >
          <div className="text-yellow-300 text-xs mb-1">CURRENT POT</div>
          <div className="text-yellow-400 text-lg font-bold">
            {lotteryState.currentPot} $WEALTH
          </div>
        </motion.div>
        
        {/* Timer Display */}
        <div className="text-center text-xs">
          <div className="text-slate-300">Next Draw In:</div>
          <div className="text-white font-bold">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
        
        {/* My Tickets */}
        {lotteryState.myTickets > 0 && (
          <div className="text-center text-xs text-emerald-300 border border-emerald-600 p-2 rounded">
            You have {lotteryState.myTickets} tickets
          </div>
        )}
        
        {/* Ticket Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Tickets:</span>
            <span className="text-white">{ticketCount}</span>
          </div>
          
          <input
            type="range"
            min="1"
            max={maxTickets}
            value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-sm"
            disabled={!canEnter || maxTickets === 0}
          />
          
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Cost: {ticketCost} $WEALTH</span>
            <span className="text-slate-400">Max: {maxTickets}</span>
          </div>
        </div>
        
        {/* Enter Button */}
        <PixelButton
          variant="wealth"
          onClick={handleEnter}
          disabled={!canEnter}
          className="w-full"
        >
          ENTER LOTTERY
        </PixelButton>
        
        {/* Rules */}
        <div className="text-xs text-slate-400 space-y-1">
          <div>Entry: 25 $WEALTH per ticket</div>
          <div>Winner: 80% of pot</div>
          <div>Treasury: 10% • Redistrib: 10%</div>
        </div>
      </div>
    </motion.div>
  )
}