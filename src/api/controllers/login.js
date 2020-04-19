import jwt from 'jsonwebtoken';
import logger from '../../../config/winston';
import key from '../../../config/config';

const userModel = [{ username: 'miguel', password: '1234' },
                   { username: 'user123', password: 'user4321' }, 
                   { username: 'us123', password: 'us4321' }];

/**
   * login
   * @param  {string} username Login Username
   * @param  {string} password Login Password
   */

function login (username, password) {
    let user = userModel.find(data => data.username === username);
    
    try {
        if (!user)
            return { code: 400, message: "User Doesnt Exist" };
        const isMatch = (password === user.password);
        if (!isMatch)
            return { code: 400, message: "Incorrect Password !" };
  
        const payload = {
            username: user.username
        };
        const token = jwt.sign(
            payload,
            key,
            { expiresIn: 3600 }
        );

        logger.info('JWT TOKEN CREATED');

        return { code: 200, token: token, message: "Ok"};
    } catch (e) {
        logger.error(e);
        return { code: 500, message: "Server Error" };
    }

}

export default login;
