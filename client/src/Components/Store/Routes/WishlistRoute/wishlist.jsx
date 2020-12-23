import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import ProductCards from '../../../Product-Cards/product-cards';
import StoreContext from '../../StoreContext';
import AllProducts from '../HomeRoute/all-product';
import FullProduct from '../HomeRoute/FullProduct/fullproduct';
import './wishlist.css';

const WishList = (props) => {
    const Context = useContext(StoreContext)
    const [product_data, SetProductData] = useState(null)

    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>NO WISHLISTS YET !! </div>

    const ProductClick = (Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>{
        SetProductData({Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id})
        props.history.replace(`/products/${ItemName}/${_id}`)
    }

    useEffect(()=>{
        window.scroll(0, 55)
    }, [])

    if(Context.TotalItems){
        if(Context.TotalItems.length >= 1){
            const dummy = [...Context.TotalItems]
            const filtered_dummy = dummy.filter((element)=>{
                return element.WishListed === true
            })
            product_cards_jsx = filtered_dummy.map((element, i)=>{
                return (
                <ProductCards
                    key={i}
                    blur={props.blur} 
                    Seller={element.Seller}
                    Price={element.Price}
                    ItemName={element.ItemName}
                    ProductImage={element.ProductImage} 
                    Description={element.Description} 
                    WishListed= {true}
                    _id= {element.item_id}
                    type={(props.type)?'MainPage':'LandingPage'}
                    Click={ProductClick.bind(this, element.Seller, element.Price, element.ItemName, element.ProductImage, element.Description, element.Wishlisted, element._id)}
                />
                )
            })
        }}
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

export default withRouter(React.memo(WishList))
