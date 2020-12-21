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
    product_image: '',
    SubmitProductForSaleHandler: ()=>{},
    TriggerWishList: ()=>{},
    AddToCartHandler: ()=>{},
    RemoveFromCartHandler: ()=>{},
    Loader: false,
    LogoutPopupHandler: ()=>{},
    logout_popup: false,
    LogoutConfirmHandler: ()=>{},
    SellerPageTrigger: ()=>{}
})

export default MainPageContext