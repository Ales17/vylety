#!/bin/sh
# Frontend entrypoint
set -e

# 1. Run migrations against the VOLUME-MOUNTED database
# This uses the DATABASE_URL defined in your docker-compose
npx @better-auth/cli migrate --yes

# 2. Start the Next.js server
exec node server.js
