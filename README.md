# Website

## Updating the website

1. Open the Github program.
2. Make sure the "rejn/website" is selected in the left hand pane.
3. **[While online]** Click the "Sync" button in the top right corner. *This ensures you are working with the latest version of the site.*
4. Select "Repository -> Open terminal" from the top toolbar. *This will open a terminal window.*
5. Type `gulp watch` into the terminal. *This will open your local version of the website in your browser.*
6. Open the Sublime Text 2 program.
7. Make your changes to the files within `/src`, and then *save* the files to preview them in the browser. *The local version of the website should automatically refresh when you save.*
8. **[While online]** Once you are happy with all your changes, return to Github and click "Sync". *An example commit message could be: "Updates prices for the new season".*
9. **[While online]** Check the live website looks OK. *It will take a few minutes for the website to update.*

## Guidelines

- [Code Guidelines](docs/code.md)
- [Content Guidelines](docs/content.md)

## Prerequisites

* [Node](http://nodejs.org/)

## Getting started

* Install with `sudo npm install gulp -g && npm install`.
* Use `gulp watch` to start developing: all the files are in `/src/`.
