import React, { Fragment, useContext, useState } from 'react';
import { Route, Switch } from 'react-router';
import ProductCards from '../../../Product-Cards/product-cards';
import StoreContext from '../../StoreContext';
import AllProducts from './all-product';
import FullProduct from './FullProduct/fullproduct';
import './home.css';

const Home = (props) => {
    const Context = useContext(StoreContext)
    const [product_data, SetProductData] = useState(null)

    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>NO PRODUCT LISTED</div>

    const ProductClick = (Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>{
        SetProductData({Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id})
        props.history.push(`/products/${ItemName}/${_id}`)
    }

    if(Context.TotalItems){
        product_cards_jsx = Context.TotalItems.map((element, i)=>{
            return (
            <ProductCards
                key={i}
                blur={props.blur} 
                Seller={element.Seller}
                Price={element.Price}
                ItemName={element.ItemName}
                ProductImage={element.ProductImage} 
                Description={element.Description} 
                WishListed={element.WishListed}
                _id= {element._id}
                type={(props.type)?'MainPage':'LandingPage'}
                Click={(e, Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>ProductClick(e, Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)}
            />
            )
        })
    }

    return (
        <Fragment>
            <main className='product-home-container'>
                <Switch>                 
                    <Route path={`/products/:productname/:id`} exact render={()=>{
                        return <FullProduct data={product_data}/>
                    }}/>
                    <Route render={()=><AllProducts jsx={product_cards_jsx}/>}/>
                </Switch>
            </main>
        </Fragment>
    )
}

export default Home
