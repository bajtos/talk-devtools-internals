#!/bin/bash

BRANCH=$1

if [ -z "$BRANCH" ]; then
  echo "Missing branch id"
  echo "Usage:"
  echo "  $0 <branchId>"
  exit 1
fi

REPOURL="http://src.chromium.org/blink/branches/chromium/$BRANCH"

function checkoutOrSwitch {
  SVNURL="$REPOURL/$1"
  DIR="$2"
  if [ -d $DIR ]; then
    echo "Switching to $SVNURL in $DIR"
    cd $DIR
    svn switch $SVNURL
    cd -
  else
    echo "Checking out $SVNURL to $DIR"
    svn checkout $SVNURL
  fi
}

## Get the devtools frontend code.
## It can be opened as a webpage, which is useful for debugging.
checkoutOrSwitch Source/devtools devtools

## Get the inspector backend code.
## This is compiled into Blink binary, the code is useful
## for understanding how exactly is the backend handling requests.
# checkoutOrSwitch Source/core/inspector inspector
