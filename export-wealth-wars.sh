#!/bin/bash

# Wealth Wars Export Script
# Creates a portable package for integration into other repositories

echo "🚀 Creating Wealth Wars export package..."

# Create export directory
mkdir -p wealth-wars-export

# Create directory structure
mkdir -p wealth-wars-export/components/pixel
mkdir -p wealth-wars-export/hooks
mkdir -p wealth-wars-export/lib

# Copy pixel components
echo "📦 Copying pixel components..."
cp src/components/pixel/*.tsx wealth-wars-export/components/pixel/ 2>/dev/null || echo "⚠️  No pixel components found"

# Copy hooks
echo "🎣 Copying hooks..."
cp src/hooks/useParticleEmitter*.ts wealth-wars-export/hooks/ 2>/dev/null
cp src/hooks/use-pixel-motion.ts wealth-wars-export/hooks/ 2>/dev/null

# Copy lib files
echo "📚 Copying lib files..."
cp src/lib/motionVariants.ts wealth-wars-export/lib/ 2>/dev/null
cp src/lib/types.ts wealth-wars-export/lib/ 2>/dev/null
cp src/lib/utils.ts wealth-wars-export/lib/ 2>/dev/null

# Copy main app (rename for clarity)
echo "🎮 Copying main game app..."
cp src/App.tsx wealth-wars-export/WealthWarsApp.tsx

# Extract pixel-specific CSS
echo "🎨 Extracting CSS..."
cat > wealth-wars-export/wealth-wars.css << 'EOF'
/* Wealth Wars Pixel Game Styles */
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

/* Game theme variables */
:root {
  /* Pixel Game Theme - Deep Space Navy with Strategic Gold */
  --ww-background: oklch(0.09 0.02 240);
  --ww-foreground: oklch(0.9 0 0);
  --ww-card: oklch(0.12 0.02 240);
  --ww-card-foreground: oklch(0.9 0 0);
  --ww-primary: oklch(0.15 0.05 240);
  --ww-primary-foreground: oklch(1 0 0);
  --ww-secondary: oklch(0.45 0.08 220);
  --ww-secondary-foreground: oklch(1 0 0);
  --ww-muted: oklch(0.2 0.02 240);
  --ww-muted-foreground: oklch(0.7 0 0);
  --ww-accent: oklch(0.78 0.12 85);
  --ww-accent-foreground: oklch(0.1 0 0);
  --ww-destructive: oklch(0.577 0.245 27.325);
  --ww-destructive-foreground: oklch(1 0 0);
  --ww-border: oklch(0.3 0.02 240);
  --ww-input: oklch(0.3 0.02 240);
  --ww-ring: oklch(0.78 0.12 85);
  --ww-radius: 0.25rem;
}

/* Custom scrollbars for game area */
.wealth-wars-container ::-webkit-scrollbar {
  width: 8px;
}

.wealth-wars-container ::-webkit-scrollbar-track {
  background: oklch(0.2 0.02 240);
}

.wealth-wars-container ::-webkit-scrollbar-thumb {
  background: oklch(0.4 0.04 220);
  border-radius: 4px;
}

.wealth-wars-container ::-webkit-scrollbar-thumb:hover {
  background: oklch(0.5 0.06 200);
}
EOF

# Create package.json
echo "📄 Creating package.json..."
cat > wealth-wars-export/package.json << 'EOF'
{
  "name": "wealth-wars-pixel-game",
  "version": "1.0.0",
  "description": "Pixel strategy idle economy game - Wealth Wars",
  "main": "WealthWarsApp.tsx",
  "keywords": ["react", "game", "pixel-art", "strategy", "idle"],
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "framer-motion": "^10.0.0",
    "@phosphor-icons/react": "^2.0.0",
    "sonner": "^1.0.0",
    "tailwindcss": "^3.0.0"
  },
  "peerDependencies": {
    "@github/spark": "^1.0.0"
  },
  "files": [
    "components/",
    "hooks/",
    "lib/",
    "WealthWarsApp.tsx",
    "wealth-wars.css",
    "README.md",
    "integration-example.tsx"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/wealth-wars-game"
  },
  "license": "MIT"
}
EOF

# Create integration example
echo "📋 Creating integration example..."
cat > wealth-wars-export/integration-example.tsx << 'EOF'
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
EOF

# Copy integration guide as README
echo "📖 Creating README..."
cp INTEGRATION_GUIDE.md wealth-wars-export/README.md

# Create installation instructions
echo "⚙️ Creating install script..."
cat > wealth-wars-export/install.sh << 'EOF'
#!/bin/bash
echo "Installing Wealth Wars dependencies..."

# Check if we're in a React project
if [ ! -f "package.json" ]; then
    echo "❌ Error: No package.json found. Please run this from your React project root."
    exit 1
fi

# Install required dependencies
echo "📦 Installing dependencies..."
npm install framer-motion @phosphor-icons/react sonner

# Optional: Install GitHub Spark if not present
echo "🚀 Checking for GitHub Spark..."
if npm list @github/spark >/dev/null 2>&1; then
    echo "✅ @github/spark already installed"
else
    echo "⚠️  @github/spark not found. Install it if you plan to use the built-in state management:"
    echo "   npm install @github/spark"
fi

echo "✅ Installation complete!"
echo "📖 Check README.md for integration instructions"
EOF

chmod +x wealth-wars-export/install.sh

# Create file list
echo "📝 Creating file manifest..."
find wealth-wars-export -type f | sort > wealth-wars-export/FILES.txt

echo ""
echo "✅ Export complete!"
echo "📦 Package created in: wealth-wars-export/"
echo ""
echo "📋 Package contents:"
ls -la wealth-wars-export/
echo ""
echo "🚀 Next steps:"
echo "1. Copy the wealth-wars-export/ directory to your target repository"
echo "2. Run: chmod +x install.sh && ./install.sh"
echo "3. Follow the integration guide in README.md"
echo ""
echo "📖 Quick start:"
echo "   import { WealthWarsApp } from './wealth-wars-export/WealthWarsApp'"
echo "   import './wealth-wars-export/wealth-wars.css'"