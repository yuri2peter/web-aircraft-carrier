#!/bin/bash

echo "Installing server packages..."
npm ci
mkdir -p ./html/resources
mkdir -p ./html/frontend
mkdir -p ./data
touch .env