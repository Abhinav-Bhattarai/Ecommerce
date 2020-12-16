import React, { Fragment, useContext } from 'react';
import MainPageContext from '../../../Containers/MainPage/MainPageContext';
import { TimesIcon } from '../Signin/login';
import '../Signup/signup.scss';

const Logout = () => {
    const Context = useContext(MainPageContext)
    return (
        <Fragment>
             <main className='signup-container logout-container'>
                <header className='signup-header'>
                    <span onClick={Context.LogoutPopupHandler}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Are you sure you want to Logout ?</div>
                </header>  
                <footer className='logout-btn-container'>
                    <button className='logout-btn' onClick={Context.LogoutConfirmHandler}>YES</button> 
                    <button className='logout-btn logout-btn-neg' onClick={Context.LogoutPopupHandler}>NO</button>  
                </footer>               
            </main>
        </Fragment>
    )
}

export default Logout
