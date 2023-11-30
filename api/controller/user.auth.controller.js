import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';
import {errorHandler} from "../utils/error.js";

import jwt from 'jsonwebtoken'
// import e from "express";

export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password : hashedPassword});
    try {
        await newUser.save()
        res.status(201).json('User Created Successfully!');
    } catch (error) {
        // next(errorHandler(550, 'Error while creating user'));
        next(error)
    }
}

export const singin =  async (req, res, next) => {
    const {email, password} = req.body;
    try {
        // find user
        const validUser = await User.findOne({ email });
        // if user is not found
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'))   
        }
        // Check / search for password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        // If password is not found
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        // checking user authentication using jsonwebtoken
        const webtoken = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        // remove user password by destructuring it 
        const {password : pass, ...rest} = validUser._doc;
        // Save token as cookie
        res
        .cookie('access_token', webtoken, {httpOnly : true})
        .status(200)
        .json(rest);// httpOnly : true means no other thrid party application can have access our cookie
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if (user) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
            const {password : pass, ...rest} = user._doc;
            res.cookie('access_toekn', token, {httpOnly : true})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User(
                {
                    username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-3),
                    email : req.body.email,
                    password : hashedPassword,
                    avatar : req.body.photo
                });
                await newUser.save();
                const webtoken = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
                // remove user password by destructuring it 
                const {password : pass, ...rest} = validUser._doc;
                // Save token as cookie
                res
                .cookie('access_token', webtoken, {httpOnly : true})
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
}