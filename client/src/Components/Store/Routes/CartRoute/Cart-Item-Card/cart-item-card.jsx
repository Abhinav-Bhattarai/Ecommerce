import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MainPageContext from '../../../../../Containers/MainPage/MainPageContext';
import './cart-item-card.scss';

const CartItemCard = (props) => {
    const Context = useContext(MainPageContext)
    const [data, SetData] = useState(props.id ? props : null)

    useEffect(()=>{
        axios.get(`/cart/${localStorage.getItem('Email')}`).then((response)=>{
            const err = {invalid: true}
            if(JSON.stringify(err) === JSON.stringify(response.data)) throw 'error'
            else{
                console.log('Further axios fetch')
            }
        })
    }, [])

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
