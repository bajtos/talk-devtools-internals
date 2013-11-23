# Talk: Internal architecture of Google Chrome Developer Tools

Source files for my talk on Internal Architecture of Chrome Developer Tools

## Dev setup without checking out and building full Chromium browser

 1. Download Google Chrome Canary

  https://www.google.com/intl/en/chrome/browser/canary.html

 1. Find out the branch number of your Canary version in About

    33.0.1703.0 => branch 1703

 1. Checkout subtree of SVN branch

  ```sh
  $ CHROME_SVN_ROOT=http://src.chromium.org/blink/branches/chromium/
  $ BRANCH={your branch number} # e.g. 1703
  $ svn checkout $CHROME_SVN_ROOOT/$BRANCH/Source/devtools
  ```

 1. Continue along the original instructions:

  ```sh
  $ cd devtools
  $ python -m SimpleHTTPServer
  ```

  Launch Chrome Canary browser as a server, open DevTools in a second
  instance, etc.


## Links

### Chrome Developer Tools

* Homepage:

  https://developers.google.com/chrome-developer-tools

* How to create extensions &amp; list of existing procotol clients:

  https://developers.google.com/chrome-developer-tools/docs/integrating

* How to setup a dev session:

  https://developers.google.com/chrome-developer-tools/docs/contributing

* Debugging Protocol:

  https://developers.google.com/chrome-developer-tools/docs/protocol/tot/index
