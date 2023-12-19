#!/bin/bash

echo "Installing common package..."
cd ./common
npm ci --silent

echo "Installing server packages..."
cd ../server
npm ci --silent
cp .env.example .env
mkdir -p ./html/frontend

echo "Installing frontend packages..."
cd ../frontend
npm ci --silent
cp .env.example .env

echo "Finished!"
echo "try: cd scripts && sh dev-frontend.sh"

