#!/bin/bash
set -e

echo "🌍 Setting up Luventra..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database (creates tables)
echo "🗄️  Pushing schema to database..."
npx prisma db push

echo ""
echo "✅ Luventra is ready!"
echo ""
echo "  Seed data:    curl http://localhost:3000/api/seed"
echo "  Development:  npm run dev"
echo "  Production:   npm run build && npm start"
echo ""
echo "  Demo login:   arjun@example.com / password123"
echo ""
