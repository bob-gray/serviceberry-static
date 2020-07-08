"use strict";

const staticFiles = require("../src/plugin");

describe("serviceberry-static", () => {
	var handler,
		request,
		response;

	beforeEach(() => {
		handler = staticFiles();
		request = createRequest();
		response = createResponse();
	});

	it("should create a handler instance with a use() method", () => {
		expect(typeof handler.use).toBe("function");
	});
});

function createRequest () {
	var response = jasmine.createSpyObj("Request", [
		"getMethod",
		"getCurrentPath",
		"proceed",
		"fail"
	]);

	// TODO: add mock implementations when more meaningful tests are written

	return response;
}

function createResponse () {
	var response = jasmine.createSpyObj("Response", [
		"setHeader",
		"getHeader"
	]);

	return response;
}
