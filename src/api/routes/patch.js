import jsonPatch from 'jsonpatch';
import auth from '../middleware/auth';
import express from 'express';
const router = express.Router();


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

router.post("/patch", auth, (req, res) => {

    const { json, patch } = req.body;
    // replace the json with the patch
    const replace = jsonPatch.apply_patch(json, patch)
    return res.send({
        data: replace
    });
    
});

export default router;