#!/bin/bash

echo "Installing frontend packages..."
cd ../frontend
npm ci
touch .env