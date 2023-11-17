import express from "express";
import { signup, singin } from "../controller/user.auth.controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', singin);

export default app;