#!/bin/bash

echo "Building app base..."

# 编译前后端
cd ../../scripts
sh build-frontend.sh
sh build-server.sh

# 回到根目录
cd ../

# 如果 app目录存在,则删除
if [ -d "./build/base/app" ]; then
  rm -rf ./build/base/app
fi

# 构建app
mkdir -p ./build/base/app/html
cp -r ./server/dist ./build/base/app
cp -r ./server/html/frontend ./build/base/app/html
cp -r ./build/base/info/. ./build/base/app

echo "App base build success!"
