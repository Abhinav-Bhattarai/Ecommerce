import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './sold-items.scss';
import Spinner from '../../../UI/Spinner/spinner';
import ProductCard from '../../../Product-Cards/product-cards';

const SoldItem = (props) => {
    const [spinner, SetSpinner] = useState(true)
    const [data, SetData] = useState(null)

    const ProductClick = (e, Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>{
        
    }

    const auth_status = JSON.parse(localStorage.getItem('authentication-status'))

    useEffect(() => {
        
        if(auth_status=== true){
            SetSpinner(true)
            axios.get(`/sold-item/${localStorage.getItem('auth-token')}/${localStorage.getItem('Email')}`).then((response)=>{
                const err = {invalid: true}
                const denial = {access_denied: true}
                if(JSON.stringify(err) !== JSON.stringify(response.data) && JSON.stringify(response.data) !== JSON.stringify(denial)){
                    SetData(response.data)
                }
                 SetSpinner(false)
            })
        }
    }, [auth_status]);

    let spinner_jsx = null
    if(spinner){
        spinner_jsx = <Spinner/>
    }

    let jsx = null

    if(data && spinner === false && auth_status === true){
        const dummy = [...data]
        jsx = dummy.map((element, i)=>{
            return (<ProductCard
                key={i}
                blur={props.blur} 
                Seller={element.Seller}
                Price={element.Price}
                ItemName={element.ItemName}
                ProductImage={element.ProductImage} 
                Description={element.Description} 
                WishListed={element.WishListed}
                _id= {element._id}
                from= 'sold-item'
                type={(localStorage.getItem('authentication-status'))?'MainPage':'LandingPage'}
                Click={(e, Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>ProductClick(e, Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)}
            />)
        })
    }

    return (
       <Fragment>
            <main className='product-history-container'>
                {jsx}
                {spinner_jsx}
            </main>
       </Fragment>
    )
}

export default SoldItem
