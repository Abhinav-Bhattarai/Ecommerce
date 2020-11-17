import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Username,
            password: process.env.Password
        }
    })
    const MailOptions = {
        from: process.env.Username,
        to: 'jsdeveloper48@gmail.com',
        subject: `Customer Contact: ${req.body.username}`,
        text: req.body.message
    }
    transporter.sendMail(MailOptions, (err, info)=>{
        if(err){console.log('error')}
        else{
            console.log('message sent to admin', info)
        }
    })
})

export default router