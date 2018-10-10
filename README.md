# koa-path-canonicalizer

[![npm version](https://img.shields.io/npm/v/koa-path-canonicalizer.svg?style=flat-square)](https://www.npmjs.com/package/koa-path-canonicalizer)
[![CircleCI](https://circleci.com/gh/herp-inc/koa-path-canonicalizer.svg?style=shield)](https://circleci.com/gh/herp-inc/koa-path-canonicalizer)

A Koa middleware to redirect to canonicalized path

## Installation

```console
$ yarn add koa-path-canonicalizer
```

## Usage

```javascript
const Koa = require('koa');
const { pathCanonicalizer } = require('koa-path-canonicalizer');

const app = new Koa();

app.use(pathCanonicalizer());
```

## License

The MIT License (MIT)
