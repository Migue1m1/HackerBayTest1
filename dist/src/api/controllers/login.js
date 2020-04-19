'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _winston = require('../../../config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userModel = [{ username: 'miguel', password: '1234' }, { username: 'user123', password: 'user4321' }, { username: 'us123', password: 'us4321' }];

/**
   * login
   * @param  {string} username Login Username
   * @param  {string} password Login Password
   */

function login(username, password) {
    var user = userModel.find(function (data) {
        return data.username === username;
    });

    try {
        if (!user) return { code: 400, message: "User Doesnt Exist" };
        var isMatch = password === user.password;
        if (!isMatch) return { code: 400, message: "Incorrect Password !" };

        var payload = {
            username: user.username
        };
        var token = _jsonwebtoken2.default.sign(payload, _config2.default, { expiresIn: 3600 });

        _winston2.default.info('JWT TOKEN CREATED');

        return { code: 200, token: token, message: "Ok" };
    } catch (e) {
        _winston2.default.error(e);
        return { code: 500, message: "Server Error" };
    }
}

exports.default = login;