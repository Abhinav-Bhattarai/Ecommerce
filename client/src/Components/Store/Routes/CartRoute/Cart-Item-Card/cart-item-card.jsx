import React, { Fragment, useContext } from 'react';
import MainPageContext from '../../../../../Containers/MainPage/MainPageContext';
import './cart-item-card.scss';

const CartItemCard = (props) => {
    const Context = useContext(MainPageContext)
    return (
        <Fragment>
            <main className='cart-item-card-container'>
                <img src={props.ProductImage} alt='product'/>
                <div className='cart-item-card-desc-container'>
                    <header className='cart-item-name'>{props.ItemName}</header>
                    <div className='cart-item-name-price'>PRICE: $ {props.Price}</div>
                    <div className='cart-item-name-prices'>QUANTITY: 1</div>
                    <div className='full-product-price-2' onClick={Context.RemoveFromCartHandler.bind(this, props.id)}>
                        <header className='tag-2'>REMOVE FROM CART</header>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default CartItemCard
