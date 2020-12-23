import React, { Fragment, useContext, useRef } from 'react';
import MainPageContext from '../../../../Containers/MainPage/MainPageContext';
import { ErrIcon } from '../../../LandingPage/Signin/login';
import './seller-page.scss';

const SellerPage = () => {
    const Context = useContext(MainPageContext)
    const image_ref = useRef(null)
    const price_ref = useRef(null)
    const desc_ref = useRef(null)
    const name_ref = useRef(null)
    const BrowseImage = ()=>{
        if(image_ref){
            image_ref.current.click()
        }
    }
    let price_jsx = null;
    let desc_jsx = null;
    let image_jsx = null;
    let name_jsx = null
    let i = 0
    if(Context.err.length >= 1){
        for(i of Context.err){
            if(i.type === 'Price'){
                price_jsx = (
                    <main className='seller-page-err-msg'>
                        <ErrIcon/>
                        <div style={{marginLeft: '1%'}}>
                            {i.error}
                        </div>
                    </main>
                )
                if(price_ref) price_ref.current.style.border = '1px solid red'
            }
            else if(i.type === 'Desc'){
                desc_jsx = (
                    <main className='seller-page-err-msg'>
                        <ErrIcon/>
                        <div style={{marginLeft: '1%'}}>
                            {i.error}
                        </div>
                    </main>
                )
                if(desc_ref) desc_ref.current.style.border = '1px solid red'
            }
            else if(i.type === 'Name'){
                name_jsx = (
                    <main className='seller-page-err-msg'>
                        <ErrIcon/>
                        <div style={{marginLeft: '1%'}}>
                            {i.error}
                        </div>
                    </main>
                )
                if(name_ref) name_ref.current.style.border = ' 1px solid red '
            }else{
                image_jsx = (
                    <main className='login-error'>
                        <ErrIcon/>
                        <div style={{marginLeft: '1%'}}>
                            {i.error}
                        </div>
                    </main>
                )
            }
        }
    }
    return (
        <Fragment>
            <main className='seller-container'>
                <main className='seller-form'>
                    <header>ADD YOUR PRODUCT HERE</header>
                    <form onSubmit={Context.SubmitProductForSaleHandler}>
                        {(Context.product_img.length >= 100)?
                        <div className='seller-page-image-container'>
                            <img src={Context.product_img}alt='product'className='seller-page-img'/>
                        </div>
                        :null}
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>product name</label>
                            <input className='seller-page-input-container-input' type='text' placeholder='' value={Context.product_name} onChange={Context.ChangeProductName} autoFocus ref={name_ref}/>
                        </div>
                        {name_jsx}
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>description</label>
                            <textarea className='seller-page-input-container-text-area' type='text' placeholder='' value={Context.product_desc} onChange={Context.ChangeProductDesc} ref={desc_ref}/>
                        </div>
                        {desc_jsx}
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>Price</label>
                            <input className='seller-page-input-container-input' type='text' placeholder='' value={Context.product_price} onChange={Context.ChangeProductPrice} ref={price_ref}/>
                        </div>
                        {price_jsx}
                        <div className='seller-page-input-container'>
                            <label className='seller-page-input-container-label'>ADD IMAGE</label>
                            <nav className='seller-page-input-container-row'>
                                <div className='seller-page-input-container-btn' onClick={BrowseImage}>BROwse Image</div>
                                <input hidden type='file' ref={image_ref} onChange={Context.FileEncoder}/>
                                <div id='status'>STATUS: {(Context.product_img.length >= 100)?'ADDED':'NO IMAGE'}</div>
                            </nav>
                        </div>
                        {image_jsx}
                        <div className='seperator'></div>
                        <button className='signup-btn'>Continue</button>
                    </form>
                </main>
            </main>
        </Fragment>
    )
}

export default SellerPage
