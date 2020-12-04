import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { FaAngleLeft, FaAngleRight, FaUserCircle } from 'react-icons/fa';
import './fullproduct.scss';
import { withRouter } from 'react-router';

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
                }
            })
        }
    }, // eslint-disable-next-line
    [])

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
                    <div className='full-product-price'>
                        <header className='tag'>PURCHASE NOW</header>
                        <footer className='full-product-price-tag'>Price: Rs {data.Price}</footer>
                    </div>
                    <div className='full-product-price full-product-wishlist'>
                        <header className='tag'>CHECKOUT</header>
                        <footer className='full-product-price-tag'>Price: Rs {data.Price}</footer>
                    </div>
                </main>
            </main>
        )
    }

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
