#!/bin/bash

if [ ! "$(ls assetSource/sounds)" ]; then exit 0;
else

rm -fr game/assets/sounds
mkdir -p game/assets/sounds/raw

audiospritler -e mp3,ogg,json --format=acc --silence --silent --output game/assets/sounds/raw/sprites assetSource/sounds/*
ffmpeg -loglevel quiet -y -i game/assets/sounds/raw/sprites.mp3 -codec:a libmp3lame -qscale:a 8 game/assets/sounds/sprites.mp3
ffmpeg -loglevel quiet -y -i game/assets/sounds/raw/sprites.ogg -codec:a libvorbis -qscale:a 2 game/assets/sounds/sprites.ogg

rm -fr game/assets/sounds/raw
fi
