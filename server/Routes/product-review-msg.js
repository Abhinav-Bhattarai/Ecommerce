import express from 'express';
import RegistrationRoute from '../Models/products.js';
import ProductModel from '../Models/products.js';
import { profanity_list } from '../profanity-list.js';

const router = express.Router()

router.get('/:id', (req, res)=>{
    const product_id = req.params.id
    RegistrationRoute.findById(product_id).then((response)=>{
        return res.json(response.Messages)
    }).catch(()=>{
        return res.json({invalid_id: true})
    })
})

router.post('/', (req, res)=>{
    const username = req.body.username
    const msg = req.body.msg
    const id = req.body.id
    const profanity = profanity_list
    const safe = profanity.filter((element)=>{
        const regex_msg = new RegExp(`${element}`, 'g')
        return regex_msg.exec(msg) !== null
    })
    if(JSON.stringify(safe) === "[]"){
        ProductModel.findOne({_id: id}, (err, response)=>{
            if(err){}else{
                response.Messages.push({username, msg})
                response.save().then(()=>{
                    return res.json({review_added: true})
                })
            }
        })
    }else{
        return res.json({profanity_detected: true})
    }
})

export default router