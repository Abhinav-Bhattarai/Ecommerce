import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });
    
    transporter.sendMail({
       from: 'Light Web Community',
       to: 'jsdeveloper48@gmail.com',
       subject: 'Light Web: Contact Us FeedBacks', 
       html: `<h1 style="margin: 10px auto; margin-bottom: 50px; text-align: center;">${req.sanitize(req.body.Username)}</h1><div>${req.sanitize(req.body.Message)}</div>`
    }, (err, info)=>{
        if(!err){
            return res.json({success: true})
        }
    })
})

export default router