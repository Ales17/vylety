#!/bin/bash

# Generate keys only if they don't exist in .env
if ! grep -q "APP_KEYS" ./backend/.env 2>/dev/null; then
  echo "APP_KEYS=$(openssl rand -base64 19),$(openssl rand -base64 19),$(openssl rand -base64 19),$(openssl rand -base64 19)
API_TOKEN_SALT=$(openssl rand -base64 31)
ADMIN_JWT_SECRET=$(openssl rand -base64 31)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 31)
JWT_SECRET=$(openssl rand -base64 31)" >> ./backend/.env

  echo "✅ Keys generated and added to .env"
else
  echo "⏭️  Keys already exist in .env, skipping..."
fi

# Start backend
docker compose up backend
