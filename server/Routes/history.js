import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:email', (req, res)=>{
    const Email = req.params.email
    RegistrationModel.find().where('Email').equals(Email).then((response)=>{
        if(response.length >= 1){
            return res.json(response[0].Purchases)
        }else{
            return res.json({invalid: true})
        }
    })
})

export default router