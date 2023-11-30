import JsonWebTokenError from "jsonwebtoken";
import {errorHandler} from './error.js'

export const verifyToken = (req, res, next) => {
    // accessing the tokens
    const token = req.cookies.access_token;
    // chscking if token is available
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    // verifying tokens
    JsonWebTokenError.verify(token, process.env.JWT_SECRET, (err, user) => {
        // if token doesn't matched
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }
        // if toekn matched
        req.user = user;
        next();
    })
}