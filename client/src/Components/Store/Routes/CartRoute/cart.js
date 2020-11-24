import React, { Fragment } from 'react';
import ProductCards from '../../../Product-Cards/product-cards';
import './cart.css';

const Cart = (props) => {
    return (
        <Fragment>
            <main className='product-cart-container'>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
            </main>
        </Fragment>
    )
}

export default Cart
