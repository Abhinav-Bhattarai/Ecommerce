import React, { Fragment, useContext, useState } from 'react';
import './product-cards.css';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import MainPageContext from '../../Containers/MainPage/MainPageContext';

const LoveIcon = (props)=>{
    let classname = ''
    if(props.Wishlisted === true){
        classname = 'wishlisted'
    }
    return(
        <IconContext.Provider value={{className: `heart-icon ${classname}`}}>
            <FaStar/>
        </IconContext.Provider>
    )
}

const ProductCards = (props) => {
    let state = false
    if(props.Wishlisted !== undefined){
        state = props.Wishlisted
    }
    const [wishlist_triggered, SetWishlistTrigger] = useState(state)
    const Context = useContext(LandingPageContext)
    const Context1 = useContext(MainPageContext)
    const WishList = ()=>{
        SetWishlistTrigger(!wishlist_triggered)
    }
    return (
        <Fragment>
            <main className='product-cards' style={{filter: `blur(${props.blur})`}}  onClick={props.Click.bind(this, props.Seller, props.Price, props.ItemName, props.ProductImage, props.Description, props.Wishlisted, props._id)}>
            <span onClick={WishList}><span onClick={(props.type === 'MainPage')?(e)=>Context1.TriggerWishList(e, wishlist_triggered, props._id, props.ItemName):(e)=>Context.Triggerwishlist(e, wishlist_triggered, props._id, props.ItemName)}><LoveIcon Wishlisted={props.Wishlisted}/></span></span>
                <img src={props.ProductImage} alt='Product-img' className='product-card-img'/>
                <article className='product-description-container'>
                    <header className='product-home-title'>{props.ItemName}</header>
                    <footer className='product-home-desc'>{props.Description}</footer>
                    <div className='Product-home-price'>Price: {props.Price}</div>
                    <div className='product-home-contact'>Phone: 9861937406</div>
                </article>
            </main>
        </Fragment>
    )
}

export default React.memo(ProductCards)
