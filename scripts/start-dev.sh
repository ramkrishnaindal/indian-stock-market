#!/bin/bash

echo "Starting development environment..."

# Start database services
docker-compose -f docker-compose.dev.yml up -d

echo "Database services started. You can now run 'npm run dev' to start the Next.js app."
echo "PostgreSQL: localhost:5432"
echo "Redis: localhost:6379"