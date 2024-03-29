#!/bin/bash

echo "Building WAC..."

rm -rf ./output
mkdir -p ./output
cd ./output
git clone git@github.com:yuri2peter/web-aircraft-carrier.git
cd ./web-aircraft-carrier
rm -rf .git
rm LICENSE
rm README.md
zip -r -q ../wac.zip .

echo "WAC build success!"
