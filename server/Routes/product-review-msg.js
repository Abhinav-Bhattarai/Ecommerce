import express from 'express';
import RegistrationRoute from '../Models/products.js';

const router = express.Router()

router.get('/:id', (req, res)=>{
    const product_id = req.params.id
    RegistrationRoute.findById(product_id).then((response)=>{
        return res.json(response.Messages)
    }).catch(()=>{
        return res.json({invalid_id: true})
    })
})

export default router