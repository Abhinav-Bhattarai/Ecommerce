import express from 'express';
import bcrypt from 'bcrypt';
import RegistrationModel from '../Models/register-model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Username = req.body.Username
    let Password = req.body.Password
    let Confirm = req.body.Confirm
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
                        jwt.sign(response, process.env.JWT_AUTH_KEY, (err, token)=>{
                            if(err){
                                return res.json({err})
                            }
                            return res.json({token})
                        })
                    })
                }}else{
                    return res.json({InvalidCredentials: ture})
                }
            })
    
        })

    })
})

export default router