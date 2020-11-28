import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import ProductModel from '../Models/products.js';

const router = express.Router()

router.delete('/', (req, res)=>{
    RegistrationModel.remove().then(()=>{
        ProductModel.remove().then(()=>{
            return res.json({deleted: true})
        })
    })
})

export default router