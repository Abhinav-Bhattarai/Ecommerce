import React, { Fragment } from 'react';
import './seller-page.scss';

const SellerPage = () => {
    return (
        <Fragment>
            <main className='seller-container'>
                <main className='seller-form'>
                    <header>ADD YOUR PRODUCT HERE</header>
                    <form>
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>product name</label>
                            <input className='seller-page-input-container-input' type='text' placeholder='' autoFocus/>
                        </div>
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>description</label>
                            <textarea className='seller-page-input-container-text-area' type='text' placeholder=''/>
                        </div>
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>Price</label>
                            <input className='seller-page-input-container-input' type='text' placeholder=''/>
                        </div>
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>EXTRA</label>
                            <input className='seller-page-input-container-input' type='text' placeholder=''/>
                        </div>
                    </form>
                </main>
            </main>
        </Fragment>
    )
}

export default SellerPage
