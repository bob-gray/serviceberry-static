"use strict";

const staticFiles = require("../src/plugin");

describe("serviceberry-static", () => {
	var handler;

	beforeEach(() => {
		handler = staticFiles();
	});

	it("should create a handler instance with a use() method", () => {
		expect(typeof handler.use).toBe("function");
	});
});