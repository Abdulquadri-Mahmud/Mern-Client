import express from "express";
import { updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const app = express(); 

// app.get('/user', userController);
// move to updateUser after verifying user token
app.post('/update/:id', verifyToken, updateUser);

export default app;