import express from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RegisterRoute from './Routes/register-route.js';
import JWTCheck from './Routes/check-jwt.js';
import LoginRoute from './Routes/login-route.js';
import ContactRoute from './Routes/Contact-us.js';
import DeleteRouter from './Routes/deleter.js';
import ProductRouter from './Routes/add-product.js';


// dot_env config
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socket(server)
const PORT = process.env.PORT
const URI = process.env.URI

// middleware 

// allows json entry and dispatch upto 50mb
app.use(bodyparser.json({limit: '50mb'}))

// socket connection for real-time functions  
io.on('connection', (socket)=>{
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})

// api endpoints
app.use('/register', RegisterRoute)
app.use('/login', LoginRoute)
app.use('/check', JWTCheck)
app.use('/contact', ContactRoute)
app.use('/delete', DeleteRouter)
app.use('/product', ProductRouter)

// db-connection
mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
    console.log('Connected to MongoDB')
}).catch(()=>{
    console.log('Not Connected to MongoDB')
})

// server listener
server.listen(PORT, ()=>{
    console.log('Connected to localhost:8000')
})