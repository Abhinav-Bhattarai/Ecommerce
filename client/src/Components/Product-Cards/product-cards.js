import React, { Fragment, useState } from 'react';
import './product-cards.css';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
import ProductImg from '../../assets/airbnb-bg.jpg';

const LoveIcon = ()=>{
    return(
        <IconContext.Provider value={{className: 'heart-icon'}}>
            <FaStar/>
        </IconContext.Provider>
    )
}

const ProductCards = (props) => {
    const [wishlist_triggered, SetWishlistTrigger] = useState(false)

    const TriggerWishlist = (e)=>{
        if(wishlist_triggered === false){
            e.target.style.color = ' #ff385c'
            SetWishlistTrigger(true)
        }else{
            e.target.style.color = 'grey'
            SetWishlistTrigger(false)
        }
    }
    return (
        <Fragment>
            <main className='product-cards' style={{filter: `blur(${props.blur})`}}>
            <span onClick={TriggerWishlist}><LoveIcon/></span>
                <img src={ProductImg} alt='Product-img' className='product-card-img'/>
                <article className='product-description-container'>
                    <header className='product-home-title'>BACKGROUND TITLE</header>
                    <footer className='product-home-desc'>This is my background if you want to buy this please do contact me from light web. I am totally free to contact at this moment so yeah this is it .... </footer>
                    <div className='Product-home-price'>Price: Rs1000</div>
                    <div className='product-home-contact'>Contact no: 9861937406</div>
                    <div className='product-home-date'>-2020/11/20</div>
                </article>
            </main>
        </Fragment>
    )
}

export default ProductCards
