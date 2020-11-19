import React, { Fragment } from 'react';
import './product-cards.css';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import ProductImg from '../../assets/airbnb-bg.jpg';

const LoveIcon = ()=>{
    return(
        <IconContext.Provider value={{className: 'heart-icon'}}>
            <FaHeart/>
        </IconContext.Provider>
    )
}

const ProductCards = (props) => {
    return (
        <Fragment>
            <main className='product-cards' style={{filter: `blur(${props.blur})`}}>
            <span><LoveIcon/></span>
                <img src={ProductImg} alt='Product-img' className='product-card-img'/>
                <article className='product-description-container'>
                    <header className='product-home-title'>BACKGROUND TITLE</header>
                    <footer className='product-home-desc'>This is my background if you want to buy this please do contact me from light web. I am totally free to contact at this moment so yeah this is it .... </footer>
                </article>
            </main>
        </Fragment>
    )
}

export default ProductCards
