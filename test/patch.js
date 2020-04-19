import request from 'request';
var expect = require("chai").expect();
var should = require("chai").should();

describe("Unit testing api/v1/patch ", function() {
    describe("Check the returned value Patch Function: ", function() {
        it("Usename and Password OK", function() {
            request.post(
                'http://localhost:3000/api/v1/login ',
                {   json: {
                        baz: "qux",
                        foo: "bar"
                    }, 
                    patch: [
                        { op: "replace", path: "/baz", value: "boo" },
                        { op: "add", path: "/hello", value: ["world"] },
                        { op: "remove", path: "/foo" }
                    ] },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        should.exist(body);
                        expect(body).to.have.property('data');
                    }
                }
            );
        });
    });
});
