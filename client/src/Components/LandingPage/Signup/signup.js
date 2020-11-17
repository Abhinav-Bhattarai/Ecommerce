import React, { Fragment, useContext } from 'react';
import './signup.css';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa'
import LandingPageContext from '../../../Containers/LandingPage/LandingPageContext';

const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

const Signup = () => {
    const Context = useContext(LandingPageContext)
    return (
        <Fragment>
            <main className='signup-container'>
                <header className='signup-header'>
                    <span onClick={Context.TriggerSignupPopup}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Sign up</div>
                </header>
                <main className='signup-input-container'>
                    <label>Email</label>
                    <div className='signup-input-rel'>
                        <input type='text' autoFocus className='signup-input'/>
                    </div>    
                    <label>Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input'/>
                    </div>
                    <label>Confirm Password</label>
                    <div className='signup-input-rel'>
                        <input type='Password' className='signup-input'/>
                    </div>
                    <label>Phone no</label>
                    <div className='signup-input-rel'>
                        <input type='Phone' className='signup-input'/>
                    </div>
                </main>
                <button className='signup-btn'>Continue</button>
                <div style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>OR</div>
                    
            </main>
        </Fragment>
    )
};

export default Signup
