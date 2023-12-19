#!/bin/bash

echo "Build App"
echo "==========================="
echo "1) base app"
echo "2) electron app (win64)"
echo "3) portable node (win64)"
echo "4) docker image"
echo "==========================="
echo "Input build type (1 ~ 4):"
read input

case $input in
    1)
      cd ./base
      sh build.sh
      ;;
    2)
      cd ./electron
      sh build.sh
      ;;
    3)
      cd ./portable
      sh build.sh
      ;;
    4)
      cd ./docker
      sh build.sh
      ;;
    *)
      echo "Error: Invalid input."
      ;;
esac