#!/bin/bash

git stash -q --keep-index

git diff-index --cached HEAD --name-only --diff-filter ACMR | egrep '.js$' | xargs $(npm bin)/jscs src
RESULT=$?

git stash pop -q

[ $RESULT -ne 0 ] && exit 1
exit 0
