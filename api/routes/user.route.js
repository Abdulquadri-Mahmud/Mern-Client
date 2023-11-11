import express  from "express";
import {test}  from "../controller/user.contrller.js";

const app = express();

app.get( '/test', test);

export default app;