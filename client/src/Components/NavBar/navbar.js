import React, { Fragment, useContext } from 'react';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import Logo from '../Logo/logo';
import './navbar.css';

const Navbar = () => {
    const Context = useContext(LandingPageContext)
    return (
        <Fragment>
            <nav className='navbar'>
                <Logo/>
                <div className='navbar-items' onClick={Context.TriggerLoginPopup}>SIGNIN</div>
                <div className='navbar-items' onClick={Context.TriggerSignupPopup}>SIGNUP</div>
                <div className='navbar-items'>CONTACT</div>
            </nav>
        </Fragment>
    )
}

export default Navbar
