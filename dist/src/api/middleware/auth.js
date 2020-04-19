'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _winston = require('../../../config/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

exports.default = router.use(function (req, res, next) {
    var token = req.cookies.token;
    _winston2.default.info('' + token);
    if (!token) return res.status(401).json({
        message: "Auth Error: Token not provided" });

    var decoded = _jsonwebtoken2.default.verify(token, _config2.default, { expiresIn: 3600 });
    req.user = decoded;
    next();
});