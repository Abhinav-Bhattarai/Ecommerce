import express from 'express';
import Middleware from '../Middleware/auth-check.js';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:auth/:email', Middleware, (req, res)=>{
    RegistrationModel.find().where('Email').equals(req.params.email).then((response)=>{
        if(response.length >= 1){
            return res.json(response.CartedItem)
        }
        return res.json({invalid: true})
    })
})

router.put('/:auth/:type', Middleware, (req, res)=>{
    const Email = req.body.email
    const item_name = req.body.ItemName
    const item_id = req.body.id
    const type = req.params.type
    const ProductImage = req.body.product_img
    const ProductPrice = parseInt(req.body.product_price)
    RegistrationModel.findOne({Email}, (err, response)=>{
        if(err) throw err
        else{
            if(type === 'add'){
                response.CartedItem.push({item_name, item_id, ProductImage, ProductPrice})
                response.save().then(()=>{
                    return res.json({carted: true})
                })
            }else{
                const data = [...response.CartedItem]
                data.filter((element, i)=>{
                    if(element.item_id === item_id){
                        data.splice(i, 1)
                    }
                    return null
                })
                response.CartedItem = data
                response.save().then(()=>{
                    return res.json({discarted: true})
                })
            }
        }
    })
})

export default router