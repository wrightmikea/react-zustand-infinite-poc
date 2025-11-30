#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Start the server in background
echo "Starting server..."
cd "$PROJECT_ROOT/server"
npm run dev &
SERVER_PID=$!

# Start the client dev server
echo "Starting client dev server..."
cd "$PROJECT_ROOT/client"
npm run dev

# Cleanup server when client exits
kill $SERVER_PID 2>/dev/null || true
