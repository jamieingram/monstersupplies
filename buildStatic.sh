#/bin/bash

# clean build directories
rm -rf build/monstersupplies/

# grab mirror of staging site
wget --mirror --convert-links -nH --page-requisites -P ./build/monstersupplies https://monster-supplies.myshopify.com/

#copy assets directory from project
cp src/theme/master/assets build/monstersupplies

#get compiled css and js
wget -nd -O=src/theme/master/assets/theme.scss.css https://monster-supplies.myshopify.com/assets/theme.scss.css
wget 

# correct mangled font paths in build css
#sed -i -e s#http://stage.goldsmiths.pokedev.net/static/fonts/#../../fonts/#g build/goldsmiths/static/css/gs/main.css
#sed -i -e s#http://stage.goldsmiths.pokedev.net/static/fonts/#../../fonts/#g build/goldsmiths/static/css/gs/popup.css

#sed -i -e s#http://stage.mappin.pokedev.net/static/fonts/#../../fonts/#g build/mappin/static/css/mw/main.css
#sed -i -e s#http://stage.mappin.pokedev.net/static/fonts/#../../fonts/#g build/mappin/static/css/mw/popup.css

#sed -i -e s#/static/images/#../../images/#g build/goldsmiths/static/css/gs/main.css
#sed -i -e s#/static/images/#../../images/#g build/goldsmiths/static/css/gs/popup.css

#sed -i -e s#/static/images/#../../images/#g build/mappin/static/css/mw/main.css
#sed -i -e s#/static/images/#../../images/#g build/mappin/static/css/mw/popup.css