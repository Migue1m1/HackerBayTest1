import loginCtrl from '../controllers/login';
import express from 'express';
import cookieParser from 'cookie-parser';
const router = express.Router();

router.use(cookieParser());

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

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const loginRes = loginCtrl(username, password);
    switch (loginRes.code) {
        case 200:
            res.cookie('token', loginRes.token, {maxAge: 3600*1000});
            return res.status(200).send(
                { message: loginRes.message, token: loginRes.token });
            
        case 400:
            return res.status(400).json(
                { message: loginRes.message });
            
        case 500:
            return res.status(500).json(
                { message: loginRes.message });
            
    }
});

export default router;