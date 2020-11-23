import express  from 'express';
import AdminModel from '../Models/admin-pannel.js';

const router = express.Router()

router.post('/', (req, res)=>{
    const Data = new AdminModel({
        Admin: req.body.admin
    })
    Data.save().then(()=>{
        return res.json({saved: true})
    })
})

export default router