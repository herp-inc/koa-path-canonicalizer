#!/bin/sh -eu

yarn install
rm -rf ./lib/*
yarn tsc -d --outDir ./lib
cp .npmignore package.json README.md ./lib
