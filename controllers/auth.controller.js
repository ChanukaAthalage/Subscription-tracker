import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import {JWT_SECRET, JWT_EXPIRES_IN} from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, email, password} = req.body;
        const exsistingUser = await User.findOne({email});

        if(exsistingUser){
            error = new Error('User with this email already exists');
            error.statusCode = 409;
            throw error;
        }

        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

        //generate token
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data:{
                user: newUsers[0],
                token
            }
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}   

export const signIn = async (req, res, next) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
           const error = new Error('User does not exist with this email');
            error.statusCode = 404;
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data:{
                user,
                token
            }
        });

    }catch(error){
        next(error);
    }
}