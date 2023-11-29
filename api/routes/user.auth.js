import express from "express";
import { google, signup, singin } from "../controller/user.auth.controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', singin);
app.post('/google', google)

export default app;