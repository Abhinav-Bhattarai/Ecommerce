import express from 'express';
import ProductModel from '../Models/products.js';

const router = express.Router()

router.get('/:email', (req, res)=>{
    const email = req.params.email
    ProductModel.find().where('Seller').equals(email).then((response)=>{
        if(response.length >= 1){
            return res.json(response)
        }
    })
})

export default router