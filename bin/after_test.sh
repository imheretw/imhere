#!/bin/bash
## for CI after test hook
set -e

# CI_BRANCH="issue-10-testing"
# CI_BRANCH="release-1.0.0"
# CI_BRANCH="master"

function checkWIP () {
  msg=`git log -1 --pretty=%B`
  # To compare for case insensitive
  shopt -s nocasematch

  case $msg in
    savepoint )
      echo "SAVEPOINT commit, do nothing"
      exit;
      ;;
    WIP )
      echo "WIP commit, do nothing"
      exit;
      ;;
  esac
}

function deploy() {
  case $CI_BRANCH in
    master )
      echo "cap staging deploy"
      cap staging deploy
      ;;
    issue-* )
      echo "cap dev deploy"
      cap dev deploy
      ;;
    * )
      echo "do nothing"
      ;;
  esac
}

checkWIP
deploy

RESULT=$?

[ $RESULT -ne 0 ] && exit 1
exit 0
