import React, { Fragment, useContext, useState } from 'react';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import Logo from '../Logo/logo';
import './navbar.css';

const Navbar = (props) => {
    const [scroll, SetScroll] = useState(false)
    const Context = useContext(LandingPageContext)
    window.addEventListener('scroll', ()=>{
        if(scroll === false){
            if(window.scrollY >= 10){
                SetScroll(true)
            }
        }else{
            if(window.scrollY <= 10){
                SetScroll(false)
            }
        }
    })
    let className = ''
    let contact_bg = ''
    if(scroll){
        className = 'scroll-nav'
        contact_bg = 'scroll-contact'
    }
    return (
        <Fragment>
            <nav className={`navbar ${className}`} style={{filter: `blur(${props.blur})`}}>
                <Logo/>
                <div className='navbar-items' onClick={Context.TriggerLoginPopup}>SIGNIN</div>
                <div className='navbar-items' onClick={Context.TriggerSignupPopup}>SIGNUP</div>
                <div className={`navbar-items navbar-contact ${contact_bg}`} onClick={Context.TriggerContactPopup}>CONTACT</div>
            </nav>
        </Fragment>
    )
}

export default Navbar
