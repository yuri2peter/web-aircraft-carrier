#!/bin/bash

cd ../server
sh init.sh
npm i ../common

cd ../frontend
sh init.sh

echo "Done."
