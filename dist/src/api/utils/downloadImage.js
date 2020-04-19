'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * downloadImage
   * @param  {string} uri image url
   * @param  {string} filename Image name
   * @param  {callback} callback Function Called when finish download
   */

function downloadImage(uri, filename, callback) {
    _request2.default.head(uri, function (err, res, body) {
        (0, _request2.default)(uri).pipe(_fs2.default.createWriteStream(filename)).on('close', callback);
    });
};

exports.default = downloadImage;