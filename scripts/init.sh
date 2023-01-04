#!/bin/bash

echo "Installing server packages..."
cd ../server
npm ci
mkdir -p ./html/resources
mkdir -p ./html/frontend
cp .env .env.local

echo "Installing frontend packages..."
cd ../frontend
npm ci
cp .env .env.local

echo "Done."
