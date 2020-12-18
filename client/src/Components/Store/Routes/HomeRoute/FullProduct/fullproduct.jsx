import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { FaAngleLeft, FaAngleRight, FaUserCircle } from 'react-icons/fa';
import './fullproduct.scss';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import dotenv from 'dotenv';
import MainPageContext from '../../../../../Containers/MainPage/MainPageContext';

dotenv.config()

const UserIcon = ()=>{
    return (
        <IconContext.Provider value={{
            className: 'user-icon'
        }}>
            <FaUserCircle/>
        </IconContext.Provider>
    )
}

const AngleRight = ()=>{
    return (
        <IconContext.Provider value={{className: 'angular-icon'}}>
            <FaAngleRight/>
        </IconContext.Provider>
    )
}

const AngleLeft = ()=>{
    return (
        <IconContext.Provider value={{className: 'angular-icon'}}>
            <FaAngleLeft/>
        </IconContext.Provider>
    )
}

const FullProduct = (props) => {

    const [data, Setdata] = useState(props.data?props.data:null)
    const [invalidity, SetInvalidity] = useState(false)
    const [socket, SetSocket] = useState(null)
    const [chat_input, SetChatInput] = useState('')
    const [chat_list, SetChatList] = useState([])
    const Context = useContext(MainPageContext)

    useEffect(()=>{
        if(props.data){
            const ENDPOINT = process.env.PROXY
            const connection = io.connect(ENDPOINT)
            connection.emit('join-room', props.match.params.id)
            SetSocket(connection)
        }
    }, //eslint-disable-next-line 
    [])

    useEffect(()=>{
        if(socket){
            socket.on('client-receiver', (username, msg)=>{
                const dummy = [...chat_list]
                dummy.push({username, msg})
                SetChatList(dummy)
            })

            socket.on('client-receiver-vulgarity', (msg)=>{
            })
            return ()=>{
                socket.off('client-receiver')
                socket.off('client-receiver-vulgarity')
            }
        }
    })

    const ChangeChatInput = (event)=>{
        const value = event.target.value
        SetChatInput(value)
    }

    const SendMessageHandler = (event)=>{
        event.preventDefault()
        if(chat_input.length >= 5){
            socket.emit('server-receiver', localStorage.getItem('Email'), chat_input, props.match.params.id)
            // adding to comment-list
            chat_list.push({username: localStorage.getItem('Email'), msg: chat_input})
            const context = {
                username: localStorage.getItem('Email'),
                msg: chat_input,
                id: props.match.params.id
            }
            axios.post('/product-review-msg', context).then((response)=>{
            })
            SetChatInput('')
        }
    }

    useEffect(()=>{
        if(props.data === null){
            axios.get(`/alternate-product-search/${props.match.params.id}`).then((response)=>
            {
                // invalidity
                if(JSON.stringify(response.data) === JSON.stringify({invalid_id: true})){
                    SetInvalidity(true)
                    props.history.push('/main-product')
                }else{
                    Setdata(response.data)
                        const ENDPOINT = process.env.PROXY
                        const connection = io.connect(ENDPOINT)
                        connection.emit('join-room', props.match.params.id)
                        SetSocket(connection)
                }
            })
        }
    }, // eslint-disable-next-line
    [])

    useEffect(()=>{
        axios.get(`/product-review-msg/${props.match.params.id}`).then((response)=>{
            const err = {invalid_id: true}
            if(JSON.stringify(response.data) !== JSON.stringify(err)){
                if(response.data.length >= 1){
                    SetChatList(response.data)
                }
            }
        })
    }, // eslint-disable-next-line
    [])

    let comment_jsx = null
    if(chat_list.length >= 1){
       const dummy = [...chat_list] 
       comment_jsx = dummy.map((element, i)=>{
           return (
               <main className='chat-area' key={i}>
                    <div className='chat-area-pic'><UserIcon/></div>
                    <div className='chat-area-msg'>{element.msg}</div>
               </main>
           )
       })
    }

    let product_jsx = null
    if(data){
        product_jsx = (
            <main>
                <div className='full-product-image-container'>
                    <img src={data.ProductImage} alt='product-desc'/>
                    <div className='angular-icon-container'><AngleLeft/></div>
                    <div className='angular-icon-container-2'><AngleRight/></div>
                </div>    
                <div className='full-product-ItemName'>{data.ItemName}</div>
                <div className='full-product-Description'>{data.Description}</div>
                <div className='full-product-seller-name'>
                   <div className='full-product-seller-name-tag'>Seller: </div>
                   <div className='full-product-seller-name-icon'><UserIcon/></div>
                   <div className='full-product-seller-name-fullname'>{data.Seller}</div>
                </div>
                <main className='full-product-button-container'>
                    <div className='full-product-price' onClick={Context.AddToCartHandler.bind(this, data.ProductImage, data.ItemName, data.Price)}>
                        <header className='tag'>PURCHASE NOW</header>
                        <footer className='full-product-price-tag'>Price: Rs {data.Price}</footer>
                    </div>
                    <div className='full-product-price full-product-wishlist' onClick={Context.AddToCartHandler.bind(this, data.ProductImage, data.ItemName, data.Price, data.id)}>
                        <header className='tag'>CHECKOUT</header>
                        <footer className='full-product-price-tag'>Price: Rs {data.Price}</footer>
                    </div>
                </main>
                {(JSON.parse(localStorage.getItem('authentication-status')) === true)?(
                    <article>
                        <header className='question-answer'>QUESTION & ANSWER SECTION</header>
                        <main className='review-container'>
                        <header className='review-input-container'>
                            <div className='review-input-pic'><UserIcon/></div>
                            <input className='review-input' type='text' value={chat_input} onChange={ChangeChatInput} placeholder='Ask a Question about the product'/>
                            <button className='review-send' onClick={SendMessageHandler}>Send</button>
                        </header>
                        </main>
                    </article>
                ):null}
                {comment_jsx}
            </main>
        )
    }

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
           {(invalidity === false)?(
                <div className='fullproduct-container'>
                    {product_jsx}
                </div>
           ):null}
        </Fragment>
    )
}

export default withRouter(FullProduct)
