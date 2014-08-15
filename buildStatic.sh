#/bin/bash

# clean build directories
rm -rf build/monstersupplies/

# grab mirror of staging sites
wget --mirror --convert-links -nH --page-requisites -P ./build/monstersupplies https://monster-supplies.myshopify.com/

# correct mangled font paths in build css
#sed -i -e s#http://stage.goldsmiths.pokedev.net/static/fonts/#../../fonts/#g build/goldsmiths/static/css/gs/main.css
#sed -i -e s#http://stage.goldsmiths.pokedev.net/static/fonts/#../../fonts/#g build/goldsmiths/static/css/gs/popup.css

#sed -i -e s#http://stage.mappin.pokedev.net/static/fonts/#../../fonts/#g build/mappin/static/css/mw/main.css
#sed -i -e s#http://stage.mappin.pokedev.net/static/fonts/#../../fonts/#g build/mappin/static/css/mw/popup.css

#sed -i -e s#/static/images/#../../images/#g build/goldsmiths/static/css/gs/main.css
#sed -i -e s#/static/images/#../../images/#g build/goldsmiths/static/css/gs/popup.css

#sed -i -e s#/static/images/#../../images/#g build/mappin/static/css/mw/main.css
#sed -i -e s#/static/images/#../../images/#g build/mappin/static/css/mw/popup.css