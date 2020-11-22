import React from 'react';

const StoreContext = React.createContext({
    HomeIconClick: ()=>{},
    HistoryIconClick: ()=>{},
    WishListIconClick: ()=>{},
    SoldItemsIconClick: ()=>{},
    CartIconClick: ()=>{}
})

export default StoreContext