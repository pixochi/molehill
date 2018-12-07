#!/bin/bash

echo "Seeding db..."

set PGPASSWORD=INSERT_YOUR_PG_PASSWORD_HERE

:: Makes sure that postgres is running
:: pg_ctl restart -m fast

psql -U node_user molehilldb < ./sql/seed-status-categories.sql

echo "🚀 Database is ready!!! 🚀 "