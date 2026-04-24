import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import {JWT_SECRET} from '../config/env.js';

const authorize = async(req, res, next) => {

    try{

        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            const error = new Error('No token provided, authorization denied');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId)

        if(!user){
            const error = new Error('User not found, authorization denied');
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();


    }catch(error){
        next(error);
    }

}

export default authorize;