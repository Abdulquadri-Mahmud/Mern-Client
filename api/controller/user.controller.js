import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    // checking if user not matched with the current user
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }
    try {
        // hashing user password
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        // updating user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username : req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new : true });
        // new true is recommended to prevent user updates from creating new info but to update
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}