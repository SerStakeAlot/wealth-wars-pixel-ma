import { motion } from 'framer-motion'
import { Business } from '@/lib/types'
import { PixelButton } from './PixelButton'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { useSoundEvents } from '@/hooks/use-pixel-motion'

interface PixelBusinessListProps {
  businesses: Business[]
  credits: number
  onPurchase: (businessId: string) => void
}

export function PixelBusinessList({ businesses, credits, onPurchase }: PixelBusinessListProps) {
  const { play } = useSoundEvents()
  
  const handlePurchase = (businessId: string) => {
    play('purchase')
    onPurchase(businessId)
  }
  
  const getTierColor = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return 'border-green-600 bg-green-900/20'
      case 2: return 'border-blue-600 bg-blue-900/20'
      case 3: return 'border-purple-600 bg-purple-900/20'
    }
  }
  
  const getTierIcon = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return 'bg-green-400'
      case 2: return 'bg-blue-400' 
      case 3: return 'bg-purple-400'
    }
  }

  return (
    <motion.div 
      className="bg-slate-800/90 border-2 border-slate-600 p-4 font-mono"
      variants={pixelMotionVariants.fadeAndRise}
      initial="initial"
      animate="animate"
      transition={pixelTransitions.medium}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
        <h3 className="text-blue-300 text-sm font-bold">BUSINESSES</h3>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {businesses.map((business) => (
          <motion.div
            key={business.id}
            className={`border-2 p-3 rounded ${getTierColor(business.tier)} ${
              business.owned ? 'opacity-60' : ''
            }`}
            variants={pixelMotionVariants.fadeAndRise}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-sm ${getTierIcon(business.tier)}`}></div>
                  <span className="text-white text-xs font-bold">{business.name}</span>
                  {business.owned && (
                    <span className="text-green-400 text-xs">OWNED</span>
                  )}
                </div>
                
                <div className="text-xs text-slate-300 mb-2">
                  +{business.creditBoost} credits per work action
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-amber-300 text-xs font-bold">
                    {business.cost.toLocaleString()} credits
                  </div>
                  
                  {!business.owned && (
                    <PixelButton
                      size="sm"
                      onClick={() => handlePurchase(business.id)}
                      disabled={credits < business.cost}
                      className="text-xs"
                    >
                      BUY
                    </PixelButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}