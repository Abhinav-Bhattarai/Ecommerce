import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

router.get('/:token', (req, res)=>{
    jwt.verify(req.params.token, process.env.JWT_AUTH_KEY, (err, response)=>{
        if(err){return res.json({err})}
        if(response){
            return res.json(response)
        }else{
            return res.json({invalid: true})
        }
    })
})

export default router