import express from 'express';
import resizeImage from '../controllers/thumb';
import logger from '../../../config/winston';
import auth from '../middleware/auth';
import downloadImage from '../utils/downloadImage';
const router = express.Router();

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

router.post("/thumb", auth, (req, res) => {
    const {uri, fileName} = req.body;
    downloadImage(uri, `./tmp/${fileName}.jpg`, function () {

        logger.info('Image Downloaded');
        let img = resizeImage(`./tmp/${fileName}.jpg`);
        res.status(200).send({ message: 'Ok' });
        logger.info('Image Resized');
    });
});
  
export default router;