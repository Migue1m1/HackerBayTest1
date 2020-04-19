'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _thumb = require('../controllers/thumb');

var _thumb2 = _interopRequireDefault(_thumb);

var _winston = require('../../../config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _downloadImage = require('../utils/downloadImage');

var _downloadImage2 = _interopRequireDefault(_downloadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
   * @swagger
   * /v1/thumb:
   *   post:
   *    summary: Thumb Image
   *    description: Thumb Image
   *    tags:
   *     - Thumb Image
   *    consumes:
   *     - application/json
   *    parameters:
   *     - in: body
   *       name: THUMB
   *       schema:
   *        type: object
   *        properties:
   *         uri:
   *          type: string
   *         fileName:
   *          type: string
   *    responses:
   *     '200':
   *       description: Image OK.
   *     '401':
   *       description: Unauthorized.
*/

router.post("/thumb", _auth2.default, function (req, res) {
    var _req$body = req.body,
        uri = _req$body.uri,
        fileName = _req$body.fileName;

    (0, _downloadImage2.default)(uri, './tmp/' + fileName + '.jpg', function () {

        _winston2.default.info('Image Downloaded');
        var img = (0, _thumb2.default)('./tmp/' + fileName + '.jpg');
        res.status(200).send({ message: 'Ok' });
        _winston2.default.info('Image Resized');
    });
});

exports.default = router;