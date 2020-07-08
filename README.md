serviceberry-static
===================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-cache-control.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-cache-control)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f550210acb7451260cd/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-cache-control/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f550210acb7451260cd/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-cache-control/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-cache-control.svg)](https://badge.fury.io/js/serviceberry-cache-control)

[Serviceberry](https://serviceberry.js.org) plugin for serving static files.

Install
-------

```shell-script
npm install serviceberry-static
```

Usage
-----

This plugin streams static files from the file system. It also handles caching per the
[`cacheOptions`](https://www.npmjs.com/package/serviceberry-cache-control#options) argument and sets `ETag` and
`Last-Modified` headers using file stats. The base path to the static files in the file system can be set explicitly
with the `basePath` argument, or it can implicit - based on the current path of the request.

```js
const staticFiles = require("serviceberry-static");

trunk.at("url/path/to/static").use(staticFiles());
```

staticFiles([basePath[, cacheOptions[, contentTypes]]])
-----------------------------------

  - **basePath** *string or null*

    If *basePath* is a string, it will be the base path of the static files served. For example, if the plugin is
    registered at `"url/path/to/static"` and the *basePath* argument passed to the plugin is `"/some/folder"` and request
    path is *url/path/to/static/awesome/pic.jpg*, then the file will be served from */some/folder/awesome/pic.jpg*.

    If *basePath* is `undefined` or `null` the request path will be used to serve the file from the current working
    directory. Given the example above, the file will be served from *{cwd}/url/path/to/static/awesome/pic.jpg*

  - **cacheOptions** *object*

    See [serviceberry-cache-control](https://www.npmjs.com/package/serviceberry-cache-control#options).

  - **contentTypes** *object*
  
    *Common file content types should work without listing them here.* Property names are file extension names and
    property values are file content types. This argument is useful when files have no extension (`""`) or for unusual
    file extensions.