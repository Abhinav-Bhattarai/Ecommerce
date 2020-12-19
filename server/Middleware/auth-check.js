import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const Middleware = (req, res, next)=>{
    const token = req.params.auth
    jwt.verify(token, process.env.JWT_AUTH_KEY, (err, response)=>{
        if(err) return res.json({access_denied: true})
        else{
            if(JSON.stringify(response) !== "{}"){
                next()
            }else{
                return res.json({access_denied_without_err: true})
            }
        }
    })
}

export default Middleware