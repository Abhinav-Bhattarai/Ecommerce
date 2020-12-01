import React, { Fragment } from 'react';
import Spinner from '../Spinner/spinner';
import './logo-page.css';

// E-COMMERCE LOGO and Name like that of native apps
const LogoPage = () => {
    const view = window.innerHeight
    return (
        <Fragment>
            <div className='logo-page-container' style={{height: `${view}px`}}>
                <Spinner/>
            </div>
        </Fragment>
    )
}

export default LogoPage
