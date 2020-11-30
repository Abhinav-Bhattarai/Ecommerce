import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:email', (req, res)=>{
    RegistrationModel.find().where('Email').equals(req.params.email).then((response)=>{
        const data = response[0].WishListedItems
        return res.json(data)
    })
})

router.put('/:type', (req, res)=>{
    const type = req.params.type
    const item_name = req.body.item_name
    const item_id = req.body.item_id
    RegistrationModel.findOne({Email: req.body.email}, (err, response)=>{
        if(type === 'add'){
            const data = {item_name, item_id}
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
            })
            response.WishListedItems = wishlisted
            response.save().then(()=>{
                return res.json({product_removed: true})
            })
        }
    })
})

export default router