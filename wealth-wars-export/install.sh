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
