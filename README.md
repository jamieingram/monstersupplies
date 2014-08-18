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
