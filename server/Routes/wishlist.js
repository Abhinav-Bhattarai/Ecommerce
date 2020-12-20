import express from 'express';
import Middleware from '../Middleware/auth-check.js';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:auth/:email', Middleware, (req, res)=>{
    RegistrationModel.find().where('Email').equals(req.params.email).then((response)=>{
        const data = response[0].WishListedItems
        return res.json(data)
    })
})

router.put('/:auth/:type', Middleware, (req, res)=>{
    const type = req.params.type
    const item_name = req.body.item_name
    const item_id = req.body.item_id
    const Seller = req.body.Seller
    const Price = req.body.price
    const ProductImage = req.body.img
    const Description = req.body.desc
    RegistrationModel.findOne({Email: req.body.email}, (err, response)=>{
        if(!err){
            if(type === 'add'){
                const data = {item_name, item_id, Seller, Price, ProductImage, Description}
                response.WishListedItems.push(data)
                response.save().then(()=>{
                    return res.json({product_added: true})
                })
            }else{
                const wishlisted = [...response.WishListedItems]
                wishlisted.filter((product, i)=>{
                    if(product.item_id === item_id){
                        wishlisted.splice(i, 1)
                    }
                    return null
                })
                response.WishListedItems = wishlisted
                response.save().then(()=>{
                    return res.json({product_removed: true})
                })
            }
        }
    })
})

export default router