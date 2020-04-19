import request from 'request';
var expect = require("chai").expect();
var should = require("chai").should();

describe("Unit testing api/v1/login ", function() {
    describe("Check the returned value Login Function: ", function() {
        it("Username and Password Wrong ", function() {
            request.post(
                'http://localhost:3000/api/v1/login',
                { url: "https://thedeclarationatcoloniahigh.com/wp-content/uploads/2019/02/rignot-full-900x505.jpg",
                  fileName: "image" },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        should.exist(body);
                        expect(body.message).to.be.equal("Ok");
                    }
                }
            );
        });
    });
});

