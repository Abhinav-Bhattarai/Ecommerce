import React, { Fragment, useContext } from 'react';
import './side-nav.css';
import { IconContext } from 'react-icons';
import { FaHistory, FaHome, FaShoppingBag, FaShoppingCart, FaStar } from 'react-icons/fa';
import StoreContext from '../Store/StoreContext';
import { withRouter } from 'react-router';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';

const Icon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaHome/>
        </IconContext.Provider>
    )
}

const FavoraitesIcon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaStar/>
        </IconContext.Provider> 
    )
}

const CartIcon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaShoppingCart/>
        </IconContext.Provider> 
    )
}

const HistoryIcon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaHistory/>
        </IconContext.Provider> 
    )
}

const SoldIcon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaShoppingBag/>
        </IconContext.Provider> 
    )
}

const SideNav = (props) => {
    const Context = useContext(StoreContext)
    const LPContext = useContext(LandingPageContext)
    const auth_state = JSON.parse(localStorage.getItem('authentication-status'))

    let jsx = null
    if(Context.CartItems){
        if(Context.CartItems.length >= 1){
            jsx = (
                <main className='cart-notifications'>
                    {Context.CartItems.length}
                </main>
            )
        }
    }
    return (
       <Fragment>
           <div className='side-nav-container' style={{filter: `blur(${props.blur})`}}>
                <div className='side-nav-icon-container' onClick={Context.HomeIconClick} data-tool-tip='Home'>
                    <Icon/>
                </div>
                <div className='side-nav-icon-container' onClick={Context.WishListIconClick} data-tool-tip='WishList'>
                    <FavoraitesIcon/>
                </div>
                <div className='side-nav-icon-container' data-tool-tip='Cart' onClick={(auth_state === false)?LPContext.TriggerSignupPopup:Context.CartIconClick}>
                    <CartIcon/>
                    {jsx}
                </div>
                <div className='side-nav-icon-container' onClick={(auth_state === false)?LPContext.TriggerSignupPopup:Context.HistoryIconClick} data-tool-tip='History'>
                    <HistoryIcon/>
                </div>
                <div className='side-nav-icon-container' onClick={(auth_state === false)?LPContext.TriggerSignupPopup:Context.SoldItemsIconClick} data-tool-tip='Sold Items'>
                    <SoldIcon/>
                </div>
           </div>
       </Fragment>
    )
}

export default withRouter(SideNav)
