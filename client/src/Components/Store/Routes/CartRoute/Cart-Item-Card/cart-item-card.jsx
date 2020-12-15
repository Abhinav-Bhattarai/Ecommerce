import React, { Fragment, useContext, useState } from 'react';
import MainPageContext from '../../../../../Containers/MainPage/MainPageContext';
import './cart-item-card.scss';

const CartItemCard = (props) => {
    const Context = useContext(MainPageContext)
    const [data] = useState(props)

    let jsx = null
    if(data){
        jsx = (<main className='cart-item-card-container'>
            <img src={data.ProductImage} alt='product'/>
            <div className='cart-item-card-desc-container'>
                <header className='cart-item-name'>{data.ItemName}</header>
                <div className='cart-item-name-price'>PRICE: $ {data.Price}</div>
                <div className='cart-item-name-prices'>QUANTITY: 1</div>
                <div className='full-product-price-2' onClick={Context.RemoveFromCartHandler.bind(this, data.id)}>
                    <header className='tag-2'>REMOVE FROM CART</header>
                </div>
            </div>
        </main>)
    }
    return (
        <Fragment>
            {jsx}
        </Fragment>
    )
}

export default CartItemCard
