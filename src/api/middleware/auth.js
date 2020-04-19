import jwt from 'jsonwebtoken';
import express from 'express';
import key from '../../../config/config';
import logger from '../../../config/winston';
const router = express.Router();

export default router.use ((req, res, next)  => {
    const token = req.cookies.token;
    logger.info(`${token}`);
    if (!token) 
        return res.status(401).json({ 
            message: "Auth Error: Token not provided" });

    const decoded = jwt.verify(token, key, { expiresIn: 3600 });
    req.user = decoded
        next()



});