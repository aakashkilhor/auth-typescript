import { Request } from "express"

export interface userRegister{
    firstname:string ;
    lastname?:string;
    email:string;
    password:string
}

export interface cookieRequest extends Request {
    cookie:string
}