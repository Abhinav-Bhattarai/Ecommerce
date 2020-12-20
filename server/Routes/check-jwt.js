import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    jwt.verify(req.body.token, process.env.JWT_AUTH_KEY, (err, response)=>{
        if(err){return res.json({})}
        if(response){
            return res.json(response)
        }else{
            return res.json({})
        }
    })
})

export default router