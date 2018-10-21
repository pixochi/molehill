#!/bin/bash

echo "Configuring db..."

set PGPASSWORD=password

:: Makes sure that postgres is running
:: pg_ctl restart -m fast

dropdb -U node_user molehilldb
createdb -U node_user molehilldb

echo "🚀 Database is ready!!! 🚀 "