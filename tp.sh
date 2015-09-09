#!/bin/bash

if [ ! "$(ls assetSource/images)" ]; then exit 0;
else

for d in assetSource/images/*/ ; do
    TexturePacker assetSource/images/$(basename $d)/* assetSource/images.tps --data game/assets/images/$(basename $d)-{n}.json --sheet game/assets/images/raw/$(basename $d)-{n}.png
done

# use posterize
# posterize -bd -Q75 game/assets/images/raw/game-0.png game/assets/images/raw/game-0-fs8.png
#
# or pngquant
# pngquant 48 game/assets/images/raw/game-0.png --force

# and rename temp files
ls game/assets/images/raw/*-fs8.png | sed -e 'p;s/-fs8.png/.png/' | xargs -n2 mv

# move all temp files to assets/images
mv game/assets/images/raw/*.png game/assets/images/

# remove temp directory
rm -fr game/assets/images/raw

fi

#If you want you can loop through other images that can be quantized to less colors, for example:

#for i in {0..15}
#do
#  TexturePacker assetSource/images/<directory_name>/$i assetSource/images.tps --data game/assets/images/<directory_name>-$i-{n}.json --sheet game/assets/images/raw/<directory_name>-$i-{n}.png
#  pngquant 48 game/assets/images/raw/<directory_name>-$i-0.png --force
#done
