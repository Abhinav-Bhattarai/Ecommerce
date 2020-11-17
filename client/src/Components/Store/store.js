import React, { Fragment } from 'react';
import './store.css';

const Store = () => {
    const view = window.innerHeight
    return (
        <Fragment>
            <main className='store-container' style={{height: `${view}px`}}>

            </main>
        </Fragment>
    )
}

export default Store
