"use strict";

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = require("chai").expect();
var should = require("chai").should();

describe("Unit testing api/v1/login ", function () {
    describe("Check the returned value Login Function: ", function () {
        it("Usename and Password OK {username: miguel, password: 1234}", function () {
            _request2.default.post('http://localhost:3000/api/v1/login ', { username: "miguel", password: "1234" }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    should.exist(body);
                    expect(body).to.have.property('token');
                }
            });
        });
        it("Username and Password Wrong { username: leugim, password: 4321 }", function () {
            _request2.default.post('http://localhost:3000/api/v1/login ', { username: "leugim", password: "4321" }, function (error, response, body) {
                if (!error && response.statusCode == 400) {
                    should.exist(body);
                    expect(body.message).to.be.equal("User Doesnt Exist");
                }
            });
        });
    });
});