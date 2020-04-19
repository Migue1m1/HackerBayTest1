'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _login = require('../controllers/login');

var _login2 = _interopRequireDefault(_login);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use((0, _cookieParser2.default)());

/**
   * @swagger
   * /v1/login:
   *   post:
   *    summary: Login
   *    description: Login system
   *    tags:
   *     - Users
   *    consumes:
   *     - application/json
   *    parameters:
   *     - in: body
   *       name: Login Users
   *       schema:
   *        type: object
   *        properties:
   *         username:
   *          type: string
   *          description: User name
   *          example: miguel
   *         password:
   *          type: string
   *          description: Password
   *          example: "1234"
   *    produces:
   *     - application/json 
   *    responses:
   *     '200':
   *       description: Login Successfull.
*/

router.post("/login", function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;

    var loginRes = (0, _login2.default)(username, password);
    switch (loginRes.code) {
        case 200:
            res.cookie('token', loginRes.token, { maxAge: 3600 * 1000 });
            return res.status(200).send({ message: loginRes.message, token: loginRes.token });

        case 400:
            return res.status(400).json({ message: loginRes.message });

        case 500:
            return res.status(500).json({ message: loginRes.message });

    }
});

exports.default = router;