#!/bin/bash

echo "Building frontend dist..."
npm run build

echo "Copying dist to server..."
cd ../
rm -rf ./server/html/frontend
cp -r ./frontend/dist ./server/html/frontend


