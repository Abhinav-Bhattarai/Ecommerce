import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RegistrationModel from '../Models/register-model.js';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Email = req.sanitize(req.body.Email)
    let Password = req.sanitize(req.body.Password)
    const DAY_3 = 84600*3 
    RegistrationModel.find().where("Email").equals(Email).then((response)=>{
        if(response.length >= 1){
            bcrypt.compare(Password, response[0].Password, (err, status)=>{
                if(err){}
                if(status === true){
                jwt.sign(response[0].toJSON(), process.env.JWT_AUTH_KEY, {expiresIn: DAY_3}, (err, token)=>{
                    if(err){
                        return res.json({invalid_credentials: true})
                    }
                    RegistrationModel.findOne({Email}, (err, active_update)=>{
                        if(err){}else{
                            active_update.ActiveStatus = true
                            active_update.save().then(()=>{
                                const Data = {
                                    Email: response[0].Email,
                                    Password: response[0].Password,
                                    ActiveStatus: true,
                                    Phone: response[0].Phone
                                }
                                return res.json({token, Data})
                            })
                        }
                    })

                })}else{
                    return res.json({invalid_credentials: true})
                }
            })
            
        }else{
            return res.json({invalid_credentials: true})
        }
    })
})

export default router