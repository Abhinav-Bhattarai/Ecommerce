import React, { Fragment, useContext, useState } from 'react';
import './product-cards.scss';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import MainPageContext from '../../Containers/MainPage/MainPageContext';

const LoveIcon = (props)=>{
    let classname = ''
    if(props.WishListed === true){
        classname = 'wishlisted'
    }
    return(
        <IconContext.Provider value={{className: `heart-icon ${classname}`}}>
            <FaStar/>
        </IconContext.Provider>
    )
}

const ProductCards = (props) => {
    const [wishlist_triggered, SetWishlistTrigger] = useState(props.WishListed? props.WishListed:false)
    const Context = useContext(LandingPageContext)
    const Context1 = useContext(MainPageContext)
    const WishList = (event)=>{
        event.stopPropagation()
        SetWishlistTrigger(!wishlist_triggered)
    }
    const auth = JSON.parse(localStorage.getItem('authentication-status'))
    return (
        <Fragment>
            <main className='product-cards' style={{filter: `blur(${props.blur})`}}  onClick={props.Click.bind(this, props.Seller, props.Price, props.ItemName, props.ProductImage, props.Description, props.WishListed, props._id)}>
            <span onClick={WishList}>
                <span onClick={(auth === true)?(e)=>Context1.TriggerWishList(e, wishlist_triggered, props._id, props.ItemName, props.Seller, props.Price, props.ProductImage, props.Description):(e)=>Context.Triggerwishlist(e, wishlist_triggered, props._id, props.ItemName, props.Seller, props.Price, props.ProductImage, props.Description)}>
                    <LoveIcon WishListed={props.WishListed}/>
                </span>
            </span>
                <img src={props.ProductImage} alt='Product-img' className='product-card-img'/>
                <article className='product-description-container'>
                    <header className='product-home-title'>{props.ItemName}</header>
                    <footer className='product-home-desc'>{props.Description}</footer>
                    <div className='full-product-price'>
                        <header className='tag'>{(props.from)?'STATUS': 'PURCHASE NOW'}</header>
                        <footer className='full-product-price-tag' onClick={Context1.AddToCartHandler.bind(this, props.ProductImage, props.ItemName, props.Price)}>Price: $ {props.Price}</footer>
                    </div>
                </article>
            </main>
        </Fragment>
    )
}

export default React.memo(ProductCards)
