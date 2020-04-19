'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resizeImage;

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * resizeImage
   * @param  {string} imageUrl image location
   */

function resizeImage(imageUrl) {
    _jimp2.default.read(imageUrl).then(function (image) {
        imageUrl = imageUrl.replace('.jpg', '');
        return image.resize(50, 50) // resize 50x50p
        .write(imageUrl + '-50x50p.jpg');
    }).catch(function (err) {});
}