import React, { Fragment } from 'react';
import './logo.css';

const Logo = (props) => {
    return (
        <Fragment>
            <div className={(props.type)?'LOGO-2':'LOGO'}>LIGHT</div>
        </Fragment>
    )
}

export default Logo
