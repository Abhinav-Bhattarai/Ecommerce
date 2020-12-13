import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router()

router.get('/:email', (req, res)=>{
    RegistrationModel.find().where('Email').equals(req.params.email).then((response)=>{
        if(response.length >= 1){
            return res.json(response)
        }
        return res.json({invalid: true})
    })
})

router.put('/:type', (req, res)=>{
    const Email = req.body.email
    const item_name = req.body.ItemName
    const item_id = req.body.id
    const type = req.params.type
    RegistrationModel.findOne({Email}, (err, response)=>{
        if(err) throw err
        else{
            if(type === 'add'){
                response.CartedItem.push({item_name, item_id})
                response.save().then(()=>{
                    return res.json({carted: true})
                })
            }else{
                const data = [...response.CartedItem]
                data.filter((element, i)=>{
                    if(element.item_id === item_id){
                        data.splice(i, 1)
                        break
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