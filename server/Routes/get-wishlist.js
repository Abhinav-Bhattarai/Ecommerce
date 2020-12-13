import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:email', (req, res)=>{
    const Email = req.params.email
    RegistrationModel.findOne({Email}, (err, response)=>{
        if(err) throw err
        else{
            return res.json(response.WishListedItems)
        }
    })
})

export default router