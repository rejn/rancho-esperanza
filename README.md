# Website

## Updating the website

1. Open the Github program.
2. In Github, if the "rejn/webiste" project isn't already open, open it by double clicking on the project name.
3. {Online} Click the "Sync [Windows] / Sync Branch [Mac]" button in the top right corner. This *must* be the first and last thing you do before editing content. This ensures we are all working with the very latest version of the website.
4. Click the "cog icon -> open a shell here" [Windows] / "Repository -> Open terminal".
5. Type "grunt" into the terminal/shell window. This will setup a local copy of the website on your machine where you can preview the changes you make.
6. Open the Sublime Text 2 program. If the list of files isn't visible on the left, then go to "Project -> Recent Projects -> <the only item>".
7. Make your changes.
8. Return to Github and "commit" (store and describe) your changes. An example commit message could be: "Updated prices for the new season".
9. {Online} Click the "Sync [Windows] / Sync Branch [Mac]" button in the top right corner. You *must* do this.
10. {Online} Now it time to put your changes live. Return to the  window and cancel the existing grunt task by pressing "ctrl+c", "then y" [Windows] / "ctrl+c" [Mac], then type "grunt deploy".
11. {Online} Check the live website looks OK.

## Getting started

* Install with `npm install grunt-cli -g && npm install`.
* Use `grunt` to start developing: all the files are in `/src/`.
* Use `grunt preview` to generate production code and preview it.
* Use `grunt deploy` to ftp the files up.

