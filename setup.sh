#!/bin/bash

# Setup script for Ramachandra Lifts website (Mac/Linux)

echo ""
echo "===================================="
echo "RC Elevators & Escalators Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed!"
    echo ""
    echo "Please download and install Node.js from https://nodejs.org/"
    echo "Then run this script again."
    echo ""
    exit 1
fi

echo "Node.js found!"
node --version
npm --version
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Dependencies installed successfully!"
echo ""

# Build CSS
echo "Building CSS..."
npm run build

if [ $? -ne 0 ]; then
    echo "Error: Failed to build CSS"
    exit 1
fi

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Your website is ready!"
echo ""
echo "Next steps:"
echo "1. Open index.html in your browser"
echo "2. Test the website"
echo "3. Deploy to production"
echo ""
echo "For development with auto-rebuild:"
echo "    npm run dev"
echo ""
echo "For minified production CSS:"
echo "    npm run minify"
echo ""
echo "For more info, see PRODUCTION_BUILD.md"
echo ""
