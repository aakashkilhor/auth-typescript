import { Request, Response } from "express"
import { userRegister } from "./interface/userInterface"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../model/user")

exports.home = (req:Request,res:Response)=>{
    res.send("Hello auth system")
}
exports.register = async (req:Request,res:Response)=>{
   try {
    console.log(`Line 11 ${JSON.stringify(req.body)}`);
    const data:userRegister = {...req.body}
    // Collecting all the information
    // Validate if data exists
    if (!(data.firstname && data.email && data.password)) {
        res.status(400).send("All fields are required")}

    // Check if email is in correct format
    
    // Check if user exists
    const existingUser = await User.findOne({email:data.email})  //{email:email} first one is variable
        //  second one is extraction from body we use {email} because javascript is smart
    if (existingUser) {
        res.status(400).send("User already exists")
    }
    // Encrypting the password
    data.password = await bcrypt.hash(data.password, 10)
    
    // Creating entry in database
    const user = await User.create(   
        {firstname:data.firstname,            // firstname:firstname, -Javascript is smart
        lastname:data.lastname,            // lastname:lastname,
        email:data.email,              // email:email,
        password:data.password}
    )
    // Create a token and send it to user
    const token = jwt.sign({
        id: user._id,
        name:user.firstname
    }, 'secret', {expiresIn: '2h'})

    user.token = token;
    // Don't want to send the password
    user.password = undefined

    res.status(201).cookie("token",token).json(user)

   } catch (error) {
    console.log(error);
    console.log("Error in response route");
   }   
}
exports.login = async(req:Request,res:Response)=>{
        try {
            // Collect information from frontend
            const { email, password} = req.body
            // Validate
            if (!(email&&password)) {
                res.status(401).send("Email & password are required")
            }
            // Check user existence
            const user = await User.findOne({email})
            console.log("Hello")
            console.log(user)
            console.log("Hi")
            // If user does not exist
            // console.log(user._id)
            if (!user){
                res.send("User does not exist")
            }

            // Match the password Create and send the token
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({id:user._id,name:user.firstname,email},'secret',{expiresIn:'12h'})
            
                user.password = undefined
                console.log(token)
                // user.token = token

            res.cookie("token", token);
            // console.log("Line 92");
            res.status(200).json({
                success:true,
                token,
                user
            })
            }
            // res.sendStatus(400).send("email or password is incorrect")
            
            
            
        } catch (error) {
            console.log(error)
            console.log("Error in login")
        }
}
exports.dashboard = (req:Request,res:Response) => {
    res.send(req.body.user.name)    
}
