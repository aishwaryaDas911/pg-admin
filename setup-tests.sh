#!/bin/bash

echo "🧪 Setting up comprehensive test suite for Login & Program Manager modules..."

# Install testing dependencies
echo "📦 Installing testing dependencies..."
npm install --save-dev \
  @testing-library/dom@^10.4.0 \
  @testing-library/jest-dom@^6.5.0 \
  @testing-library/react@^16.0.1 \
  @testing-library/user-event@^14.5.2 \
  @vitest/coverage-v8@^2.1.8 \
  @vitest/ui@^2.1.8 \
  jsdom@^25.0.1 \
  vitest@^2.1.8

# Update package.json scripts
echo "⚙️ Updating package.json with test scripts..."
npm pkg set scripts.test="vitest"
npm pkg set scripts.test:ui="vitest --ui"
npm pkg set scripts.test:coverage="vitest --coverage"
npm pkg set scripts.test:watch="vitest --watch"

echo "✅ Test setup complete!"
echo ""
echo "🚀 Available commands:"
echo "  npm test              - Run all tests"
echo "  npm run test:coverage - Run tests with coverage report"
echo "  npm run test:ui       - Run tests with UI interface"
echo "  npm run test:watch    - Run tests in watch mode"
echo ""
echo "📊 Coverage goals: 90%+ line and branch coverage"
echo "📁 Coverage reports will be generated in ./coverage/"
