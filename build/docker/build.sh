#!/bin/bash

echo "Building docker image..."

# 如果 app目录存在,则删除
if [ -d "./info/app" ]; then
  rm -rf ./info/app
fi

cp -r ../base/app ./info
if [ -e "./info/.env" ]; then
  cp -f ./info/.env ./info/app
fi
cp ../base/app/.env ./info/.env

cd ./info
sh docker-build.sh

echo "Docker image build success!"
