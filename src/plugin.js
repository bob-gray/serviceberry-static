"use strict";

const Caching = require("./Caching"),
	{join, extname} = require("path"),
	{promises: {stat}, createReadStream} = require("fs"),
	{contentType} = require("mime-types"),
	allowed = ["GET", "HEAD"];

class Static {
	static create () {
		return new Static(...arguments);
	}

	constructor (path, cacheOptions, {...contentTypes} = {}) {
		Object.freeze(Object.assign(this, {
			path,
			cache: new Caching(cacheOptions),
			contentTypes
		}));
	}

	async use (request, response) {
		const path = this.getFilePath(request),
			stats = await this.getStats(path),
			method = request.getMethod();

		if (stats && allowed.includes(method)) {
			request.static = Object.freeze({path, ...stats});
			await this.cache.use(request, response);
		} else if (stats) {
			request.fail(`Request method ${method} is not allowed`, "Method Not Allowed", {
				Allow: allowed.join(", ")
			});
		} else {
			request.proceed();
		}

		// if the file was found, the method was allowed, and the cache plugin did not respond
		if (stats && response.notBegun()) {
			this.respond(request, response);
		}
	}

	getFilePath (request) {
		var basePath = this.path;

		// this is a good candidate for the nullish operator ?? when Node.js lts is 14
		// eslint-disable-next-line eqeqeq
		if (basePath == null) {
			basePath = decodeURI(request.getCurrentPath());
		}

		return join(basePath, decodeURI(request.remainingPath));
	}

	// eslint-disable-next-line consistent-return
	async getStats (path) {
		try {
			const {ino, size, mtimeMs} = await stat(path);

			return {ino, size, mtimeMs};
		} catch {
			// return no stats if stat fails
		}
	}

	respond (request, response) {
		const {path, size} = request.static,
			options = {
				headers: {
					"Content-Length": size
				}
			};

		if (response.withoutHeader("Content-Type")) {
			options.headers["Content-Type"] = this.getContentType(path);
		}

		if (request.getMethod() === "GET") {
			options.content = createReadStream(path);
		}

		response.send(options);
	}

	getContentType (path) {
		const extension = extname(path).slice(1),
			explicitType = Object.getOwnPropertyDescriptor(this.contentTypes, extension);

		return contentType((explicitType && explicitType.value) || extension || "application/octet-stream");
	}
}

module.exports = Static.create;
module.exports.Static = Static;
