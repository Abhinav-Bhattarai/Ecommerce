import React, { Fragment } from 'react';
import './side-nav.css';
import { IconContext } from 'react-icons';
import { FaHistory, FaHome, FaShoppingBag, FaShoppingCart, FaStar } from 'react-icons/fa';

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
    return (
       <Fragment>
           <div className='side-nav-container' style={{filter: `blur(${props.blur})`}}>
                <div className='side-nav-icon-container'>
                    <Icon/>
                </div>
                <div className='side-nav-icon-container'>
                    <FavoraitesIcon/>
                </div>
                <div className='side-nav-icon-container'>
                    <CartIcon/>
                </div>
                <div className='side-nav-icon-container'>
                    <HistoryIcon/>
                </div>
                <div className='side-nav-icon-container'>
                    <SoldIcon/>
                </div>
           </div>
       </Fragment>
    )
}

export default SideNav
