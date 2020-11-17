import React, { Fragment } from 'react';
import Logo from '../Logo/logo';
import './navbar.css';

const Navbar = () => {
    return (
        <Fragment>
            <nav className='navbar'>
                <Logo/>
                <div className='navbar-items'>SIGNIN</div>
                <div className='navbar-items'>SIGNUP</div>
                <div className='navbar-items'>CONTACT</div>
            </nav>
        </Fragment>
    )
}

export default Navbar
