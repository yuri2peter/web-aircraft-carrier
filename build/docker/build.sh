#!/bin/bash

echo "Building docker image..."

if [ ! -d "../base/app" ]; then
  echo "Please build base app first."
  exit 1
fi

rm -rf ./context
rm -rf ./output
mkdir -p ./context
mkdir -p ./output
mkdir -p ./output/volumes
mkdir -p ./output/volumes/db
mkdir -p ./output/volumes/uploads

# build context
cp -r ../base/app ./context
if [ -e "./info/.env" ]; then
  cp -f ./info/.env ./context/app
fi
cp -f ./info/docker-build.sh ./context
cp -f ./info/Dockerfile ./context

cd ./context
sh docker-build.sh

# output(example)
cd ../
cp -f ./info/docker-compose.yml ./output
cp -f ./context/app/.env ./output/volumes

echo "Docker image build success!"
