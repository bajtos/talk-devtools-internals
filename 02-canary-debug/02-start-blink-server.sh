#!/bin/bash -v

/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary \
  --remote-debugging-port=9222 --no-first-run \
  --remote-debugging-frontend="http://localhost:8000/front_end/inspector.html" \
  --user-data-dir=blink-chromeServerProfile \
  $PWD/../01-html-page/index.html
