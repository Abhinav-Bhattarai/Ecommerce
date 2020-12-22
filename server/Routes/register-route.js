import express from 'express';
import bcrypt from 'bcrypt';
import RegistrationModel from '../Models/register-model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    let Password = req.sanitize(req.body.Password)
    let Confirm = req.sanitize(req.body.Confirm)
    const Email = req.sanitize(req.body.Email)
    const Phone = req.sanitize(req.body.Phone)
    RegistrationModel.find().where('Email').equals(Email).then((checker)=>{
        if(checker.length === 0){
            bcrypt.hash(Password, 10).then((hash)=>{
                Password = hash
                bcrypt.compare(Confirm, Password, (err, state)=>{
                    const Data = new RegistrationModel({
                        Email,
                        Password,
                        ActiveStatus: true,
                        Phone: parseInt(Phone)
                    })
                    let username_check = false
                    if(Email.length >= 10){
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
                    
                        if(state){
                        if(username_check && password_check){
                            Data.save().then((response)=>{
                                const DAY_3 = 84600*3 
                                jwt.sign(response.toJSON(), process.env.JWT_AUTH_KEY, {expiresIn: DAY_3}, (err, token)=>{
                                    if(err){
                                        return res.json({invalid_credentials: true})
                                    }
                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: process.env.Email,
                                            pass: process.env.Password
                                        }
                                    });
                                    
                                    transporter.sendMail({
                                       from: 'Light Web Community',
                                       to: Email,
                                       subject: 'Light web Invitation', 
                                       html: '<h1 style="margin: 10px auto; text-align: center;">Welcome to Light Web</h1><div style="padding: 10px 2%; margin: 10px auto; font-size: 16px">Please confirm your Email to further continue with LightWeb.</div><a href="https://localhost:3000" style="width: 95%; display:block; margin:10px auto; padding:18px 4%; background-color: #ff374e; color:#fff; font-size:20px; border: none;  border-radius: 10px; margin-top:30px; text-align: center;">Accept to Confirm</a>'
                                    }, (err, info)=>{})
                        
                                    return res.json({token, Data})
                                })
                            })
                        }}else{
                            return res.json({invalid_credentials: true})
                        }
            
                }) //

            })
        
        }else{
            return res.json({user_redundancy: true})
        }
  
   
    })
})

export default router