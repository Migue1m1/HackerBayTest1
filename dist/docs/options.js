'use strict';

var options = function options() {
  var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "development";

  return {
    swaggerDefinition: {
      info: {
        title: "Test 1 Backend",
        description: "Endpoints provided by Test 1.",
        version: "1.0"
      },
      schemes: env == "production" ? ["https"] : ["http", "https"],
      basePath: "/api",
      produces: ["application/json"],
      security: [{
        basicAuth: []
      }]
    },
    apis: ["./docs/*.yaml", "./routes/*.js"] //, "./models/*.js"]
  };
};

module.exports = options;