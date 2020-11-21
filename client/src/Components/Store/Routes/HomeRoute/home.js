import React, { Fragment } from 'react';
import ProductCards from '../../../Product-Cards/product-cards';
import './home.css';

const Home = (props) => {
    return (
        <Fragment>
            <main className='product-home-container'>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
            </main>
        </Fragment>
    )
}

export default Home
