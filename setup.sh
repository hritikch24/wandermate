#!/bin/bash
set -e

echo "🌍 Setting up WanderMate..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Create database & push schema
echo "🗄️  Setting up database..."
npx prisma db push

# Seed with sample data
echo "🌱 Seeding database..."
npx tsx prisma/seed.ts

# Build
echo "🏗️  Building for production..."
npm run build

echo ""
echo "✅ WanderMate is ready!"
echo ""
echo "  Development:  npm run dev"
echo "  Production:   npm start"
echo ""
echo "  Demo login:   arjun@example.com / password123"
echo ""
