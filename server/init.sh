#!/bin/bash

echo "Installing server packages..."
npm ci
touch .env

echo "Done."
