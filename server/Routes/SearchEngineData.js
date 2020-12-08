import express from 'express';
import ProductModel from '../Models/products.js';

const router = express.Router()

router.get('/', (req,  res)=>{
    ProductModel.find().then((response)=>{
        if(response.length >= 1){
            let product = 0
            const data = []
            for(product of response){
                data.push(product.ItemName)
            }
            return res.json(data)
        }else{
            return res.json({no_product: true})
        }
    })
})

export default router