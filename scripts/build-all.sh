#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Generate build info
BUILD_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
BUILD_HOST=$(hostname)
BUILD_COMMIT=$(git -C "$PROJECT_ROOT" rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "Generating build info..."
cat > "$PROJECT_ROOT/client/src/buildInfo.js" << EOF
export const buildInfo = {
  timestamp: "${BUILD_TIMESTAMP}",
  host: "${BUILD_HOST}",
  commit: "${BUILD_COMMIT}"
};
EOF

echo "Building client..."
cd "$PROJECT_ROOT/client"
npm install
npm run build

echo "Installing server dependencies..."
cd "$PROJECT_ROOT/server"
npm install

echo "Build complete!"
