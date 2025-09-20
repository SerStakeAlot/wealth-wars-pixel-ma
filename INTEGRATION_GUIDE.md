# Wealth Wars - Integration Guide

## Overview
This guide explains how to integrate the Wealth Wars pixel strategy game into another React/TypeScript repository.

## Prerequisites
Your target repository should have:
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- A build system (Vite, Next.js, etc.)

## Required Dependencies

Add these packages to your target repository:

```bash
npm install framer-motion
npm install @phosphor-icons/react
npm install sonner
```

If using GitHub Spark hooks:
```bash
npm install @github/spark
```

## File Structure to Copy

Copy these directories and files from this project:

```
src/
├── components/
│   └── pixel/           # All pixel game components
├── lib/
│   ├── types.ts         # Game state types
│   ├── motionVariants.ts # Animation variants
│   └── utils.ts         # Utility functions
├── hooks/
│   ├── useParticleEmitterSimple.ts
│   ├── use-pixel-motion.ts
│   └── useSoundEvents.ts
└── assets/              # Any game assets
```

## CSS Integration

### Option 1: Merge CSS
Add the pixel-specific styles from `src/index.css` to your existing CSS:

```css
/* Add to your main CSS file */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

/* Pixel-specific styles */
.pixel-button {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  box-shadow: 
    inset 1px 1px 0 rgba(255,255,255,0.2),
    inset -1px -1px 0 rgba(0,0,0,0.3);
}

.pixel-button:active {
  box-shadow: 
    inset 1px 1px 0 rgba(0,0,0,0.3),
    inset -1px -1px 0 rgba(255,255,255,0.1);
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: oklch(0.2 0.02 240);
}

::-webkit-scrollbar-thumb {
  background: oklch(0.4 0.04 220);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.5 0.06 200);
}
```

### Option 2: Separate CSS Module
Create a dedicated `wealth-wars.css` file with the pixel styles and import it where needed.

## Integration Steps

### 1. Copy Files
Copy the required directories and files to your target repository, maintaining the folder structure.

### 2. Update Import Paths
If your target repository uses a different alias than `@/`, update all imports in the copied files:

```typescript
// Change from:
import { PixelHUD } from '@/components/pixel/PixelHUD'

// To (example):
import { PixelHUD } from './components/pixel/PixelHUD'
// or
import { PixelHUD } from '~/components/pixel/PixelHUD'
```

### 3. Handle State Management
The game currently uses `useKV` from GitHub Spark. You have two options:

#### Option A: Keep GitHub Spark
Install `@github/spark` and keep the existing state management.

#### Option B: Replace with Standard State
Replace `useKV` calls with your preferred state management:

```typescript
// Replace this:
const [gameState, setGameState] = useKV<GameState>('wealth-wars-state', initialState)

// With this (using localStorage):
const [gameState, setGameState] = useLocalStorage<GameState>('wealth-wars-state', initialState)

// Or with Redux, Zustand, etc.
```

### 4. Integration Component
Create a wrapper component in your target repository:

```typescript
// WealthWarsGame.tsx
import React from 'react'
import App from './components/wealth-wars/App' // Adjust path as needed

interface WealthWarsGameProps {
  className?: string
  // Add any props you need to pass from your main app
}

export function WealthWarsGame({ className }: WealthWarsGameProps) {
  return (
    <div className={className}>
      <App />
    </div>
  )
}
```

### 5. Use in Your App
Import and use the game component:

```typescript
import { WealthWarsGame } from './components/WealthWarsGame'

function MyApp() {
  return (
    <div>
      <h1>My Application</h1>
      <WealthWarsGame className="mt-8" />
    </div>
  )
}
```

## Configuration Options

### Theme Integration
If you want to integrate with your existing theme system, you can:

1. **Override CSS Variables**: Update the CSS custom properties to match your theme
2. **Use Theme Provider**: Wrap the game in your theme provider
3. **Custom Color Props**: Add color props to the main game component

### Feature Flags
Consider adding feature flags for different game features:

```typescript
interface GameConfig {
  enableLottery?: boolean
  enableBattles?: boolean
  enableShields?: boolean
  maxBusinessTier?: number
}

function WealthWarsGame({ config }: { config?: GameConfig }) {
  // Pass config to components to show/hide features
}
```

## Environment Variables
If you need to configure the game, consider these environment variables:

```env
# Optional: Disable certain features
WEALTH_WARS_ENABLE_LOTTERY=true
WEALTH_WARS_ENABLE_BATTLES=false

# Optional: Adjust game balance
WEALTH_WARS_EXCHANGE_RATE=75
WEALTH_WARS_DAILY_CAP=1000
```

## Testing
The game components are self-contained and can be tested independently:

```typescript
import { render, screen } from '@testing-library/react'
import { WealthWarsGame } from './WealthWarsGame'

test('renders wealth wars game', () => {
  render(<WealthWarsGame />)
  expect(screen.getByText('WORK STATION')).toBeInTheDocument()
})
```

## Performance Considerations
- The game uses Framer Motion animations - consider lazy loading if performance is critical
- Particle effects are lightweight but can be disabled with reduced motion preferences
- Game state is persisted automatically with `useKV`

## Customization
The pixel art style can be customized by:
- Updating CSS custom properties for colors
- Modifying the pixel button styles
- Changing the font from JetBrains Mono to your preferred monospace font
- Adjusting animation timing in `motionVariants.ts`

## Support
The game is designed to be self-contained with minimal external dependencies. All game logic is client-side and doesn't require a backend server.