'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonpatch = require('jsonpatch');

var _jsonpatch2 = _interopRequireDefault(_jsonpatch);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
   * @swagger
   * /v1/patch:
   *   post:
   *    summary: JSON Patch
   *    description: JSON Patch Object
   *    tags:
   *     - Patch
   *    consumes:
   *     - application/json
   *    parameters:
   *     - in: body
   *       name: JSON PATCH
   *       schema:
   *        type: object
   *        properties:
   *         json:
   *          type: object
   *         patch:
   *          type: object
   *    produces:
   *     - application/json 
   *    responses:
   *     '200':
   *       description: Patch Successfull.
   *     '401':
   *       description: Unauthorized.
*/

router.post("/patch", _auth2.default, function (req, res) {
    var _req$body = req.body,
        json = _req$body.json,
        patch = _req$body.patch;
    // replace the json with the patch

    var replace = _jsonpatch2.default.apply_patch(json, patch);
    return res.send({
        data: replace
    });
});

exports.default = router;