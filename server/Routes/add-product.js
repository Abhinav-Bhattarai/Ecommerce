import express from 'express';
import ProductModel from '../Models/products.js';
import RegistrationModel from  '../Models/register-model.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Seller = req.body.Seller
    const Price = parseInt(req.body.Price)
    const ItemName = req.body.ItemName
    const ProductImage = req.body.ProductImage
    const Description = req.body.Description
    const PostDate = new Date(parseInt(Date.now)).toLocaleDateString()
    // add the phone no too
    // ES6 OP
    const Data = new ProductModel({
        Seller, Price, ItemName, ProductImage, Description, PostDate
    })
    RegistrationModel.find().where('Email').equals(Seller).then((response)=>{
        if(response.length >= 1){
            if(Seller.length >= 11 && Price >= 10 && ItemName.length >= 4 && ProductImage.length > 100 && Description.length >= 10){  
                Data.save().then((response)=>{
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth:{
                            user: process.env.Email,
                            pass: process.env.Password
                        }
                    })
                    transporter.sendMail({
                        from: 'Light web community',
                        to: Seller,
                        subject: 'Product Listed',
                        text: `You've successfully uploaded Your product ${Data}`
                    }), (err, info)=>{
                        }
                    })
                    return res.json({product_posted: true})
                }    
        }    
    })
})

router.get('/:n', (req, res)=>{
    const number = req.params.n
    ProductModel.find().sort({'date': 1}).skip(number*10).limit(10).then((response)=>{
        return res.json(response.sort(()=>{return {ItemName: 1}}))
    })
})

router.delete('/:product_id', (req, res)=>{
    ProductModel.findByIdAndDelete(req.params.product_id).then((response)=>{
        return res.json({product_deleted: true})
    }).catch((err)=>{
    })
})

export default router