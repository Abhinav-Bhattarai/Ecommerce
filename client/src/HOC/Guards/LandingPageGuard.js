import React, { Fragment } from 'react';

const LandingPageGuard = (props) => {
    let jsx = null
    if(props.auth === false){
        jsx = props.children
    }
    return (
        <Fragment>
            {jsx}
        </Fragment>
    )
}

export default LandingPageGuard
