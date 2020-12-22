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
import WishListRouter from './Routes/wishlist.js';
import AdminRouter from './Routes/Make-admin.js';
import AlternateProductRoute from './Routes/alternate-product-search.js'; 
import { profanity_list } from './profanity-list.js';
import ProductReviewMessageRouter from './Routes/product-review-msg.js';
import SearchEngineRouter from './Routes/SearchEngineData.js';
import GetWishListRouter from './Routes/get-wishlist.js';
import CartRoute from './Routes/cart.js';
import SoldItemRoute from './Routes/sold-items.js';
import HistoryRoute from './Routes/history.js';
import sanitize from 'express-sanitizer';

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
app.use(sanitize())

// socket connection for real-time functions  
io.on('connect', (socket)=>{
    socket.on('join-room', (room)=>{socket.join(room)})

    socket.on('server-receiver', (client_id, msg, room)=>{
        const profanity = profanity_list
        const safe = profanity.filter((element)=>{
            const regex_msg = new RegExp(`${element}`, 'g')
            return regex_msg.exec(msg) !== null
        })
        if(JSON.stringify(safe) === "[]"){
            socket.broadcast.to(room).emit('client-receiver', client_id, msg)
        }else{
            socket.emit('client-receiver-vulgarity', 'Profanity-detected')
        }
    })

    socket.on('disconnect', ()=>{})
})

// api endpoints
app.use('/register', RegisterRoute)
app.use('/login', LoginRoute)
app.use('/check', JWTCheck)
app.use('/contact', ContactRoute)
app.use('/delete', DeleteRouter)
app.use('/product', ProductRouter)
app.use('/wishlist', WishListRouter)
app.use('/admin', AdminRouter)
app.use('/alternate-product-search', AlternateProductRoute)
app.use('/product-review-msg', ProductReviewMessageRouter)
app.use('/search-engine-data', SearchEngineRouter)
app.use('/get-wishlist-item', GetWishListRouter)
app.use('/cart', CartRoute)
app.use('/sold-item', SoldItemRoute)
app.use('/history', HistoryRoute)

// db-connection
mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
    console.log('Connected to mongoDB')
}).catch(()=>{
    console.log('Failed to connect to mongoDB')
})

// server listener
server.listen(PORT, ()=>{
    console.log('Listening to localhost:8000')
})

// need to provide auth key for accessing the api endpoints for security and removing password sending even if hashed to react.js. Refactoring the code for more optimizations. Connection to socket to the auth protected from jwt. jwt access token for login and register to be valid for 3days and prtected routes jwt auth key to be valid for 30 mins and adding new auth key after 30 mins to prevent from attacks. Integration stripe payment gatewy systems for payment transactions.