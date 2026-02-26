#!/bin/sh

# 1. Zajištění existence složky pro databázi (pro jistotu)
mkdir -p /app/data

# 2. Aplikování vygenerovaného schématu do SQLite databáze
echo "Spouštím aktualizaci databázového schématu..."
sed 's/CREATE TABLE/CREATE TABLE IF NOT EXISTS/g' /app/schema.sql | sqlite3 /app/data/sqlite.db

# 3. Předání řízení aplikaci Next.js
echo "Startuji Next.js server..."
exec node server.js
