import * as dotenv from "dotenv"
dotenv.config();
import express from 'express'
import router from './route/auth/authroutes'
import cookieParser from "cookie-parser";
import connect from "./config/database";

connect();
const app = express()
app.use(express.json()) 
app.use(router)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

module.exports = app

