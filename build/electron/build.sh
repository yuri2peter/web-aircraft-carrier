#!/bin/bash

echo "Building Electron app..."

if [ ! -d "./output" ]; then
  echo "Please prepare electron-app-template first."
  exit 1
fi

if [ ! -d "../base/app" ]; then
  echo "Please build base app first."
  exit 1
fi

if [ -d "./output/resources/app" ]; then
  rm -rf ./output/resources/app
fi

cp -r ../base/app ./output/resources
cp -rf ./info/. ./output/resources/app

echo "Electron app build success!"
