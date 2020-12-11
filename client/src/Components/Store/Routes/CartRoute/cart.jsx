import React, { Fragment, useContext } from 'react';
import StoreContext from '../../StoreContext';
import CartItemCard from './Cart-Item-Card/cart-item-card';
import './cart.css';

const Cart = () => {
    const Context = useContext(StoreContext)
    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>SORRY</div>
    if(Context.CartItems){
        const data = [...Context.CartItems]
        product_cards_jsx = data.map((element, i)=>{
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
    return (
       <Fragment>
            <main className='product-cart-container'>
                {product_cards_jsx}
            </main>
       </Fragment>
    )
}

export default Cart
