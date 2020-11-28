import express from 'express';
import fs from 'fs';

const router = express.Router()

router.post('/', (req, res)=>{
    fs.writeFile('C:/Users/dependra/Desktop/Files.txt', req.body.result, (err)=>{
        if(err) throw err
        res.json({content: 'File.txt added'})
    })
})

export default router