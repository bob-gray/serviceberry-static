"use strict";

const CacheControl = require("serviceberry-cache-control");

class Caching extends CacheControl {
	getETag (request) {
		const {ino, size, mtimeMs} = request.static;

		return `"${ino}:${size}:${mtimeMs}"`;
	}

	getLastModified (request) {
		return new Date(request.static.mtimeMs);
	}
}

module.exports = Caching;
