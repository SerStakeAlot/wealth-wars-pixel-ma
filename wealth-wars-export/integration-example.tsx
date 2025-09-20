// Example integration in your React app
import React from 'react'
import { WealthWarsApp } from './WealthWarsApp'
import './wealth-wars.css'

// Basic integration
export function BasicIntegration() {
  return (
    <div className="wealth-wars-container">
      <WealthWarsApp />
    </div>
  )
}

// Integration with custom wrapper
export function CustomIntegration() {
  return (
    <div className="my-app-container">
      <header>
        <h1>My Application</h1>
      </header>
      
      <main>
        <section className="game-section">
          <h2>Play Wealth Wars</h2>
          <div className="wealth-wars-container max-w-7xl mx-auto">
            <WealthWarsApp />
          </div>
        </section>
      </main>
    </div>
  )
}

// Integration with theme provider
export function ThemedIntegration() {
  return (
    <div 
      className="wealth-wars-container"
      style={{
        // Override theme variables if needed
        '--ww-accent': 'oklch(0.7 0.15 120)', // Green accent instead of gold
        '--ww-primary': 'oklch(0.2 0.08 260)', // Purple primary
      }}
    >
      <WealthWarsApp />
    </div>
  )
}
