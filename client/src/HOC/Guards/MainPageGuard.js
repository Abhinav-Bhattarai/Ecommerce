import React, { Fragment } from 'react';

const MainPageGuard = (props) => {
    let jsx = null
    if(props.auth === true){
        jsx = props.children
    }
    return (
        <Fragment>
            {jsx}
        </Fragment>
    )
}

export default MainPageGuard
