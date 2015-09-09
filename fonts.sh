#!/bin/bash

if [ ! "$(ls assetSource/fonts)" ]; then exit 0;
else

cp -f assetSource/fonts/*.{xml,fnt} game/assets/fonts/

for d in assetSource/fonts/*.png ; do
    # adjust number of colors - for example: 48 16 8
    pngquant 16 $d --force
done

for d in assetSource/fonts/*-fs8.png ; do
    mv $d game/assets/fonts/$(basename ${d/-fs8.png/.png/})
done

fi
