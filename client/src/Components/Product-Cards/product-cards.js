import React, { Fragment, useContext, useState } from 'react';
import './product-cards.css';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';

const LoveIcon = ()=>{
    return(
        <IconContext.Provider value={{className: 'heart-icon'}}>
            <FaStar/>
        </IconContext.Provider>
    )
}

const ProductCards = (props) => {
    const [wishlist_triggered, SetWishlistTrigger] = useState(false)
    const Context = useContext(LandingPageContext)
    const WishList = ()=>{
        SetWishlistTrigger(!wishlist_triggered)
    }
    return (
        <Fragment>
            <main className='product-cards' style={{filter: `blur(${props.blur})`}}>
            <span onClick={WishList}><span onClick={(e)=>Context.Triggerwishlist(e, wishlist_triggered, props._id, props.ItemName)}><LoveIcon/></span></span>
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

export default ProductCards
