Project: Monster Supplies website store
Date: 16 August 2014
Author: Jamie Ingram
==

Shopify theme for Monster Supplies store

Introduction:
This theme is based on the Timber framework from Shopify (http://shopify.github.io/Timber/)
The Shopify theme gem is required to deploy new changes to the website:

https://github.com/Shopify/shopify_theme

To watch your theme for changes use the following command:

theme watch

NOTE: you must be in the theme directory to execute this command

Deployment:

To completely replace theme assets with the local version use the following command:

theme replace

UPDATE: grunt is now used to run a task to combine import statements in multiple scss files, and then run the theme watch command.
Run 'grunt' in the theme directory after you've installed dependancies.

CMS organisation:

Products in the featured and curses collections will not appear on the homepage.
Featured products - most craved this week on homepage
Curses - available options in the basket

Products - if a rollver image is available you need to enter "true" in the "Has rollover" field for the product. The second image will then be used as a rollover image. The alt text for this image MUST contain the word rollover
related products - these are product handles that will appear on the product page. To get a product handle look at the url of the product page
Gift ideas - products are grouped by tag. Allowed tags are "little monsters", "mummies", "ogres"
Product in homepage carousel - if there is an image with the alt text "desktop_carousel" then this product appears in the homepage carousel.You must have a second image with alt text "mobile_carousel". When appearing in the carousel the summary field is used.

Featured blog items - for other featured content you need to create a new blog post in the "featured" blog category. The Content is used in the carousel, and the excerpt must contain JUST two images - the desktop one first, followed by the mobile one. Link label and Link Target are also used in the carousel.

If a product is in the  "extra" collection it will appear in the basket as a potential extra item to add (in the Why not treat yourself section of the page)

For collect in store - create a product called "collect in store" with type delivery with unlimited stock and weight of 1000kg. Then create a shipping option that is free for anything over 1000kg.