# Wealth Wars - Export Package

This script helps you export the Wealth Wars game for integration into another repository.

## Quick Export

Run this script to create a portable package:

```bash
#!/bin/bash

# Create export directory
mkdir -p wealth-wars-export

# Copy game components
cp -r src/components/pixel wealth-wars-export/components/
cp -r src/hooks wealth-wars-export/hooks/
cp -r src/lib wealth-wars-export/lib/

# Copy main app file
cp src/App.tsx wealth-wars-export/WealthWarsApp.tsx

# Copy styles
cp src/index.css wealth-wars-export/wealth-wars.css

# Create package info
cat > wealth-wars-export/package.json << EOF
{
  "name": "wealth-wars-pixel-game",
  "version": "1.0.0",
  "description": "Pixel strategy idle economy game",
  "main": "WealthWarsApp.tsx",
  "dependencies": {
    "react": "^18.0.0",
    "framer-motion": "^10.0.0",
    "@phosphor-icons/react": "^2.0.0",
    "sonner": "^1.0.0"
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
    "README.md"
  ]
}
EOF

# Copy documentation
cp INTEGRATION_GUIDE.md wealth-wars-export/README.md

echo "✅ Export complete! Check the 'wealth-wars-export' directory"
echo "📦 You can now copy this directory to your target repository"
```

## Manual Export Steps

If you prefer to export manually:

1. **Create target directory** in your other repo
2. **Copy these files/folders**:
   - `src/components/pixel/` → `your-repo/src/components/pixel/`
   - `src/hooks/` → `your-repo/src/hooks/`
   - `src/lib/` → `your-repo/src/lib/`
   - `src/App.tsx` → `your-repo/src/components/WealthWarsApp.tsx`
3. **Copy CSS** from `src/index.css` (pixel-specific styles)
4. **Install dependencies** in target repo
5. **Update import paths** as needed

## Dependencies to Install

```bash
npm install framer-motion @phosphor-icons/react sonner
```

## Usage in Target Repo

```typescript
import { WealthWarsApp } from './components/WealthWarsApp'

function MyApp() {
  return (
    <div>
      <WealthWarsApp />
    </div>
  )
}
```