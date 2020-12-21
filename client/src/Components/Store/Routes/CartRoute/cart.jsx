import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import StoreContext from '../../StoreContext';
import CartItemCard from './Cart-Item-Card/cart-item-card';
import './cart.css';

const Cart = () => {
    const Context = useContext(StoreContext)
    const [data, SetData] = useState(Context.CartItems ? Context.CartItems : null)
    const auth_status = JSON.parse(localStorage.getItem('authentication-status'))
    useEffect(()=>{
        if(data === null && auth_status === true){
            axios.get(`/cart/${localStorage.getItem('auth-token')}/${localStorage.getItem('Email')}`).then((response)=>{
                console.log(response.data)
                const invalid = {invalid: true}
                if(JSON.stringify(invalid) !== JSON.stringify(response.data)){
                    if(response.data.length >= 1){
                        SetData(response.data)
                    }
                }
            })
        }
    }, [data, auth_status])

    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>SORRY</div>

    if(Context.CartItems && auth_status === true){
        if(Context.CartItems.length >= 1){
            const dummy = [...Context.CartItems]
            product_cards_jsx = dummy.map((element, i)=>{
            return (
                <CartItemCard
                    key={i}
                    ProductImage={element.product_img}
                    ItemName={element.product_name}
                    Price={element.product_price}
                    id={element.id}
                />
            )
        })
        }
    }

    if(Context.CartItems === null && data && auth_status === true){
        if(data.length >= 1){
            const dummy = [...data]
            product_cards_jsx = dummy.map((element, i)=>{
            return (
                <CartItemCard
                    key={i}
                    ProductImage={element.product_img}
                    ItemName={element.product_name}
                    Price={element.product_price}
                    id={element.id}
                />
            )
        })
        }
    }
    return (
       <Fragment>
            <main className='product-cart-container'>
                {product_cards_jsx}
            </main>
       </Fragment>
    )
}

export default Cart
