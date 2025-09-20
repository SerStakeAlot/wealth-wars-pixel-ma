import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { PixelHUD } from '@/components/pixel/PixelHUD'
import { PixelExchangePanel } from '@/components/pixel/PixelExchangePanel'
import { PixelBusinessList } from '@/components/pixel/PixelBusinessList'
import { PixelLotteryPanel } from '@/components/pixel/PixelLotteryPanel'
import { PixelButton } from '@/components/pixel/PixelButton'
import { ParticleRenderer } from '@/components/pixel/ParticleRenderer'
import { GameState, Business, LotteryState } from '@/lib/types'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useParticleEmitterSimple } from '@/hooks/useParticleEmitterSimple'
import { useSoundEvents } from '@/hooks/use-pixel-motion'

const INITIAL_BUSINESSES: Business[] = [
  { id: 'vendor1', name: 'Street Vendor', cost: 100, creditBoost: 5, tier: 1, owned: false },
  { id: 'cafe1', name: 'Coffee Cart', cost: 500, creditBoost: 15, tier: 1, owned: false },
  { id: 'shop1', name: 'Mini Market', cost: 1200, creditBoost: 35, tier: 2, owned: false },
  { id: 'factory1', name: 'Production Line', cost: 3000, creditBoost: 80, tier: 2, owned: false },
  { id: 'complex1', name: 'Industrial Complex', cost: 8000, creditBoost: 200, tier: 3, owned: false },
]

function App() {
  const { emit, getParticleData } = useParticleEmitterSimple()
  const { play } = useSoundEvents()
  
  // Persistent game state
  const [gameState, setGameState] = useKV<GameState>('wealth-wars-state', {
    credits: 250,
    wealth: 5,
    shieldExpiresAt: null,
    businesses: INITIAL_BUSINESSES,
    dailyWealthConverted: 0,
    globalPoolRemaining: 850
  })
  
  // Temporary lottery state (would come from server)
  const [lotteryState] = useState<LotteryState>({
    currentPot: 125,
    myTickets: 0,
    drawsAt: Date.now() + 300000, // 5 minutes
    isActive: true
  })
  
  // Work action
  const handleWork = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    const ownedBusinesses = gameState.businesses.filter(b => b.owned)
    const totalBoost = ownedBusinesses.reduce((sum, b) => sum + b.creditBoost, 10)
    
    emit(x, y, 'credit', 2)
    play('work')
    
    setGameState(prev => ({
      ...prev,
      credits: prev.credits + totalBoost
    }))
  }
  
  // Convert credits to wealth
  const handleConvert = (wealthAmount: number) => {
    const creditsCost = wealthAmount * 75
    const fee = Math.floor(creditsCost * 0.01)
    
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - creditsCost - fee,
      wealth: prev.wealth + wealthAmount,
      dailyWealthConverted: prev.dailyWealthConverted + wealthAmount,
      globalPoolRemaining: prev.globalPoolRemaining - wealthAmount
    }))
  }
  
  // Purchase business
  const handlePurchaseBusiness = (businessId: string) => {
    const business = gameState.businesses.find(b => b.id === businessId)
    if (!business || gameState.credits < business.cost) return
    
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - business.cost,
      businesses: prev.businesses.map(b => 
        b.id === businessId ? { ...b, owned: true } : b
      )
    }))
  }
  
  // Enter lottery
  const handleEnterLottery = (tickets: number) => {
    const cost = tickets * 25
    
    setGameState(prev => ({
      ...prev,
      wealth: prev.wealth - cost
    }))
  }
  
  // Purchase shield
  const handlePurchaseShield = (hours: number) => {
    const costs = { 1: 5, 24: 20, 72: 50 }
    const cost = costs[hours as keyof typeof costs]
    
    if (gameState.wealth < cost) return
    
    const expiresAt = Date.now() + (hours * 60 * 60 * 1000)
    
    setGameState(prev => ({
      ...prev,
      wealth: prev.wealth - cost,
      shieldExpiresAt: expiresAt
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main HUD */}
      <PixelHUD gameState={gameState} />
      
      {/* Game Grid */}
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Work & Businesses */}
        <motion.div 
          className="space-y-4"
          variants={pixelMotionVariants.fadeAndRise}
          initial="initial"
          animate="animate"
          transition={pixelTransitions.medium}
        >
          {/* Work Action */}
          <div className="bg-slate-800/90 border-2 border-slate-600 p-6 font-mono text-center">
            <h3 className="text-cyan-300 text-sm font-bold mb-4">WORK STATION</h3>
            <PixelButton
              onClick={handleWork}
              size="lg"
              className="w-full text-lg"
            >
              PERFORM WORK
            </PixelButton>
            <div className="mt-2 text-xs text-slate-400">
              Base: 10 credits + business bonuses
            </div>
          </div>
          
          {/* Businesses */}
          <PixelBusinessList 
            businesses={gameState.businesses}
            credits={gameState.credits}
            onPurchase={handlePurchaseBusiness}
          />
        </motion.div>
        
        {/* Center Column - Exchange & Actions */}
        <motion.div 
          className="space-y-4"
          variants={pixelMotionVariants.fadeAndRise}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1, ...pixelTransitions.medium }}
        >
          <PixelExchangePanel 
            gameState={gameState}
            onConvert={handleConvert}
          />
          
          {/* Shield Panel */}
          <div className="bg-slate-800/90 border-2 border-slate-600 p-4 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              <h3 className="text-blue-300 text-sm font-bold">DEFENSE SHIELDS</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <PixelButton
                size="sm"
                onClick={() => handlePurchaseShield(1)}
                disabled={gameState.wealth < 5}
                className="text-xs"
              >
                1H<br/>5W
              </PixelButton>
              <PixelButton
                size="sm" 
                onClick={() => handlePurchaseShield(24)}
                disabled={gameState.wealth < 20}
                className="text-xs"
              >
                24H<br/>20W
              </PixelButton>
              <PixelButton
                size="sm"
                onClick={() => handlePurchaseShield(72)}
                disabled={gameState.wealth < 50}
                className="text-xs"
              >
                72H<br/>50W
              </PixelButton>
            </div>
            
            {gameState.shieldExpiresAt && gameState.shieldExpiresAt > Date.now() && (
              <div className="mt-2 text-xs text-blue-300 text-center">
                Shield Active
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Right Column - Lottery & Battle Feed */}
        <motion.div 
          className="space-y-4"
          variants={pixelMotionVariants.fadeAndRise}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2, ...pixelTransitions.medium }}
        >
          <PixelLotteryPanel
            lotteryState={lotteryState}
            wealth={gameState.wealth}
            onEnterLottery={handleEnterLottery}
          />
          
          {/* Battle Feed Placeholder */}
          <div className="bg-slate-800/90 border-2 border-slate-600 p-4 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
              <h3 className="text-red-300 text-sm font-bold">BATTLE FEED</h3>
            </div>
            <div className="text-xs text-slate-400 text-center py-4">
              No recent activity
            </div>
            {/* TODO: Implement battle system in Phase 2 */}
          </div>
        </motion.div>
      </div>
      
      {/* Global particle renderer */}
      <ParticleRenderer particles={getParticleData()} />
    </div>
  )
}

export default App