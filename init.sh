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

echo "Preparing building tools..."
cd ../build
cp -r ./base/info.example ./base/info
cp -r ./docker/info.example ./docker/info
cp -r ./electron/info.example ./electron/info
cp -r ./portable/info.example ./portable/info

echo "Finished!"
echo "try: cd scripts && sh dev-frontend.sh"

