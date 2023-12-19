#!/bin/bash

echo "Building portable app..."

if [ ! -d "./output" ]; then
  echo "Please prepare node-app-protable first."
  exit 1
fi

if [ -d "./output/app" ]; then
  rm -rf ./output/app
fi

cp -r ../base/app ./output

if [ -e "./info/.env" ]; then
  cp -f ./info/.env ./output/app
fi

if [ -e "./info/start.bat" ]; then
  cp -f ./info/start.bat ./output
fi

echo "Portable app build success!"
