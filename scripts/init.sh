#!/bin/bash

echo "Installing server packages..."
cd ../server
npm ci
mkdir -p ./html/resources
mkdir -p ./html/frontend
mkdir -p ./data
touch .env

echo "Installing frontend packages..."
cd ../frontend
npm ci
touch .env

echo "Done."
