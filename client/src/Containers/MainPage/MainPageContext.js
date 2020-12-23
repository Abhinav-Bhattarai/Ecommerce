import React from 'react';

const MainPageContext = React.createContext({
    FileEncoder: ()=>{},
    TriggerContactPopup: ()=>{},
    ChangeContactFrom: ()=>{},
    ChangeContactReason: ()=>{},
    SubmitContactHandler: ()=>{},
    contact_from: '',
    contact_reason: '',
    contactus_popup: false,
    ClearScreenHandler: ()=>{},
    ChangeProductName: ()=>{},
    ChangeProductDesc: ()=>{},
    ChangeProductPrice: ()=>{},
    product_name: '',
    product_price: '',
    product_desc: '',
    product_img: '',
    SubmitProductForSaleHandler: ()=>{},
    TriggerWishList: ()=>{},
    AddToCartHandler: ()=>{},
    RemoveFromCartHandler: ()=>{},
    Loader: false,
    LogoutPopupHandler: ()=>{},
    logout_popup: false,
    LogoutConfirmHandler: ()=>{},
    SellerPageTrigger: ()=>{},
    err: null
})

export default MainPageContext