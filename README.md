# ausplots-map

A web page that uses the data from https://github.com/ternandsparrow/swarm-rest
to create a map view of the Ausplots sites.

This tool is deployed to http://map.ausplots.org.au.

# Developer quickstart
  1. clone repo
  1. install dependencies:
      ```bash
      yarn
      ```
  1. start dev server:
      ```bash
      yarn serve
      # OR, override the API to use
      VUE_APP_API_URL=http://example.org:3333 yarn serve
      ```
