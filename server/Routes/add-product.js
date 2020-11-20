import express from 'express';
import ProductModel from '../Models/products.js';
import RegistrationModel from  '../Models/register-model.js';

const router = express.Router()

router.post('/', (req, res)=>{
    const Seller = req.body.Seller
    const Price = parseInt(req.body.Price)
    const ItemName = req.body.ItemName
    const Image = req.body.ProductImage
    const Description = req.body.Description

    const Data = new ProductModel({
        Seller, Price, ItemName, Image, Description
    })

    RegistrationModel.find().where('Email').equals(Seller).then((response)=>{
    if(response.length >= 1){
        if(Seller.length >= 11 && Price >= 100 && ItemName.length >= 4 && Image.length > 100 && Description.length >= 10){  
            Data.save().then((response)=>{
                console.log(response)
                return res.json({product_posted: true})
            })
        }
    }
    })
})

router.get('/:n', (req, res)=>{
    const number = req.params.n
    ProductModel.find().sort({'date': 1}).skip(number*10).limit(10).then((response)=>{
        return res.json(response)
    })
})

export default router