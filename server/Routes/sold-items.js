import express from 'express';
import Middleware from '../Middleware/auth-check.js';
import ProductModel from '../Models/products.js';

const router = express.Router()

router.get('/:auth/:email', Middleware, (req, res)=>{
    const email = req.params.email
    ProductModel.find().where('Seller').equals(email).then((response)=>{
        if(response.length >= 1){
            return res.json(response)
        }
        return res.json({invalid: true})
    })
})

export default router 