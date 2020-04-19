"use strict";

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = require("chai").expect();
var should = require("chai").should();

describe("Unit testing api/v1/patch ", function () {
    describe("Check the returned value Patch Function: ", function () {
        it("Usename and Password OK", function () {
            _request2.default.post('http://localhost:3000/api/v1/login ', { json: {
                    baz: "qux",
                    foo: "bar"
                },
                patch: [{ op: "replace", path: "/baz", value: "boo" }, { op: "add", path: "/hello", value: ["world"] }, { op: "remove", path: "/foo" }] }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    should.exist(body);
                    expect(body).to.have.property('data');
                }
            });
        });
    });
});