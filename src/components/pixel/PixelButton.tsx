import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { pixelMotionVariants, pixelTransitions } from '@/lib/motionVariants'
import { cn } from '@/lib/utils'
import { useReducedMotionPref } from '@/hooks/use-pixel-motion'

interface PixelButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'destructive' | 'wealth'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function PixelButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className 
}: PixelButtonProps) {
  const prefersReducedMotion = useReducedMotionPref()
  
  const baseClasses = 'font-mono font-bold border-2 transition-all duration-150 pixel-button'
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-500 border-blue-800 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-500 border-gray-800 text-white', 
    destructive: 'bg-red-600 hover:bg-red-500 border-red-800 text-white',
    wealth: 'bg-yellow-500 hover:bg-yellow-400 border-yellow-700 text-black'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-current'

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && disabledClasses,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled && !prefersReducedMotion ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !prefersReducedMotion ? { scale: 0.98 } : undefined}
      transition={pixelTransitions.quick}
    >
      {children}
    </motion.button>
  )
}