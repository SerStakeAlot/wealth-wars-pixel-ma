export interface GameState {
  credits: number
  wealth: number
  shieldExpiresAt: number | null
  businesses: Business[]
  dailyWealthConverted: number
  globalPoolRemaining: number
}

export interface Business {
  id: string
  name: string
  cost: number
  creditBoost: number
  tier: 1 | 2 | 3
  owned: boolean
}

export interface LotteryState {
  currentPot: number
  myTickets: number
  drawsAt: number
  isActive: boolean
}

export interface BattleEvent {
  id: string
  timestamp: number
  type: 'attack' | 'defend' | 'warning'
  attacker?: string
  defender?: string
  damage?: number
  blocked?: boolean
}

export interface DailyResetState {
  lastReset: number
  nextReset: number
  isResetting: boolean
}