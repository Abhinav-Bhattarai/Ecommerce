import React from 'react';

const StoreContext = React.createContext({
    HomeIconClick: ()=>{},
    HistoryIconClick: ()=>{},
    WishListIconClick: ()=>{},
    SoldItemsIconClick: ()=>{},
    CartIconClick: ()=>{},
    WishListItems: null,
    TotalItems: null,
    CartItems: null
})

export default StoreContext