import { NextFunction, Request, Response } from "express"
// import { cookieRequest } from "../controllers/interface/userInterface";
import cookieParser from "cookie-parser";
const jwt = require("jsonwebtoken")

const auth = (req:Request,res:Response,next:NextFunction)=>{
   //  console.log(JSON.stringify(req));
   console.log(req.cookies);
   
    const token = req.cookies["cookie"]

    if (!token) {
       return res.status(403).send("Token missing")
    }
    // Verify token
    try {
       const decode = jwt.verify(token,'secret')
      //  console.log(decode);
       req.body = decode
       console.log(decode)

    //    Extract id from token and query the DB
    
    } catch (error) {
      res.status(403).send("Token invalid")
    }
    return next()
}

module.exports = auth