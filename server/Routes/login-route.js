import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RegistrationModel from '../Models/register-model.js';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Email = req.body.Email
    let Password = req.body.Password
    bcrypt.hash(Password, 10).then((hash)=>{
        Password = hash
        const DAY_3 = 84600*3 
        RegistrationModel.find().where("Email").equals(Email).then((response)=>{
            if(response.length >= 1){
                bcrypt.compare(Password, response[0].Password, (err, status)=>{
                    if(status === true){
                    jwt.sign(response[0].toJSON(), process.env.JWT_AUTH_KEY, {expiresIn: DAY_3}, (err, token)=>{
                        if(err){
                            return res.json({err})
                        }
                        return res.json({token})
                    })}else{
                        return res.json({invalid_credentials: true})
                    }
                })
                
            }else{
                return res.json({invalid_credentials: true})
            }
        })
    })
    
})

export default router