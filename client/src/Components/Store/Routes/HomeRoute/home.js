import React, { Fragment, useContext } from 'react';
import ProductCards from '../../../Product-Cards/product-cards';
import StoreContext from '../../StoreContext';
import './home.css';

const Home = (props) => {
    const Context = useContext(StoreContext)
    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>SORRY</div>
    if(Context.TotalItems){
        product_cards_jsx = Context.TotalItems.map((element)=>{
            return (
            <ProductCards
                blur={props.blur} 
                Seller={element.Seller}
                Price={element.Price}
                ItemName={element.ItemName}
                ProductImage={element.ProductImage} 
                Description={element.Description} 
                Wishlisted={element.Wishlisted}
            />
            )
        })
    }
    return (
        <Fragment>
            <main className='product-home-container'>
                {product_cards_jsx}
            </main>
        </Fragment>
    )
}

export default Home
