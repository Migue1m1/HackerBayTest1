'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('./src/api/routes/login');

var _login2 = _interopRequireDefault(_login);

var _patch = require('./src/api/routes/patch');

var _patch2 = _interopRequireDefault(_patch);

var _thumb = require('./src/api/routes/thumb');

var _thumb2 = _interopRequireDefault(_thumb);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swaggerDefinition = {
  info: {
    title: "Test 1 Backend",
    description: "Endpoints provided by Test 1.",
    version: "1.0"
  },
  host: 'localhost:3000',
  basePath: "/api",
  produces: ["application/json"],
  security: [{
    basicAuth: []
  }]
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/api/routes/*.js"]
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

var app = (0, _express2.default)();

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());
app.use("/api/v1", _login2.default);
app.use("/api/v1", _patch2.default);
app.use("/api/v1", _thumb2.default);
app.use("/api-docs", _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerSpec));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.get('/', function (req, res) {
  return res.json({
    message: 'HackerBay thumbnails generator - ACCES FIRST api/v1/login'
  });
});

// error handler
app.use(function (err, req, res, next) {
  _winston2.default.error((err.status || 500) + ' - ' + err.message + ' \n    - ' + req.originalUrl + ' - ' + req.method + ' - ' + req.ip);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

var port = process.env.PORT || "3000";
var server = app.listen(port);

_winston2.default.info('App is running on  http://localhost:' + port);

exports.default = server;