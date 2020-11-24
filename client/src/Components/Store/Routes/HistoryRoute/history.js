import React, { Fragment } from 'react';
import ProductCards from '../../../Product-Cards/product-cards';
import './history.css';

const History = (props) => {
    return (
       <Fragment>
            <main className='product-history-container'>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
                <ProductCards blur={props.blur}/>
            </main>
       </Fragment>
    )
}

export default History
