#!/bin/bash

cd ../common
sh init.sh

cd ../server
sh init.sh
npm i ../common

cd ../frontend
sh init.sh
npm i ../common

echo "Done."
