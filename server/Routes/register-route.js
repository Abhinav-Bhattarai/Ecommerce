import express from 'express';
import bcrypt from 'bcrypt';
import RegistrationModel from '../Models/register-model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Username = req.body.Username
    let Password = req.body.Password
    let Confirm = req.body.Confirm
    const Email = req.body.Email
    bcrypt.hash(Password, 10).then((hash)=>{
        Password = hash
        bcrypt.hash(Confirm, 10).then((hash)=>{
            Confirm = hash
            const Data = new RegistrationModel({
                Username,
                Password,
                ActiveStatus: true
            })
            let username_check = false
            if(Username.length >= 5){
                username_check = true
            }
            let password_check = false
            if(Password.length >= 8){
                const Number_regex = /[0-9]/
                const UpperCaseRegex = /[A-Z]/
                if(Number_regex.exec(Password) !== null && UpperCaseRegex.exec(Password) !== null){
                    password_check = true
                }
            }
    
            let Confirm_Check = false
    
            bcrypt.compare(Password, Confirm, (err, state)=>{
                if(state){
                if(username_check && password_check && Confirm_Check){
                    Data.save().then((response)=>{
                        const DAY_3 = 84600*3 
                        jwt.sign(response.toJSON(), process.env.JWT_AUTH_KEY, {expiresIn: DAY_3}, (err, token)=>{
                            if(err){
                                return res.json({err})
                            }
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth:{
                                    user: 'lightweb69@gmail.com',
                                    password: 'pythonjs123'
                                }
                            })
                            const MailOptions = {
                                from: 'lightweb69@gmail.com',
                                to: Email,
                                subject: "Thank you for registering to LightWeb",
                                text: "We welcome you to Light Web. If you have any queries you can contact us in this email 'lightweb69@gmail.com'."
                            }
                            transporter.sendMail(MailOptions, (err, info)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log('Email Sent', info)
                                }

                            })
                            return res.json({token})
                        })
                    })
                }}else{
                    return res.json({InvalidCredentials: true})
                }
            })
    
        })

    })
})

export default router