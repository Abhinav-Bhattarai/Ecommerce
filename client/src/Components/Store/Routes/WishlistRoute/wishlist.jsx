import axios from 'axios';
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
    const [wishlist, SetWishList] = useState(Context.TotalItems?Context.TotalItems:null)
    const [type] = useState(Context.TotalItems?'props':'axios')

    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>NO WISHLIST YET !! </div>

    const ProductClick = (Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>{
        SetProductData({Seller, Price, ItemName, ProductImage, Description, Wishlisted})
        props.history.push(`/products/${ItemName}/${_id}`)
    }

    useEffect(()=>{
        console.log('wishlist')
        if(wishlist === null){
            axios.get(`/get-wishlist-item/${localStorage.getItem('Email')}`).then((response)=>{
                const data = [...response.data]
                const error = {invalid: true}
                if(JSON.stringify(data) !== JSON.stringify(error)){
                    SetWishList(data)
                }
            })
        }
        window.scroll(0, 100)
    }, // eslint-disable-next-line
    [])

    if(wishlist){
        if(wishlist.length >= 1){
            const dummy = [...Context.TotalItems]
            if(type === 'axios'){
                product_cards_jsx = dummy.map((element, i)=>{
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
                        Click={(Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>ProductClick(Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)}
                    />
                    )
                })
            }else{
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
                        _id= {element._id}
                        type={(props.type)?'MainPage':'LandingPage'}
                        Click={(Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)=>ProductClick(Seller, Price, ItemName, ProductImage, Description, Wishlisted, _id)}
                    />
                    )
                })

            }
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
