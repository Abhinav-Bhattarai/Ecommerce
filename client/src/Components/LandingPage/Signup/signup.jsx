import React, { Fragment, useContext, useRef } from 'react';
import './signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa'
import { ErrIcon } from '../Signin/login'
import LandingPageContext from '../../../Containers/LandingPage/LandingPageContext';
import PasswordLogo from '../../PasswordLogo/password-logo';

const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

const Signup = () => {

    const password_ref = useRef(null)
    const confirm_ref = useRef(null)

    const Context = useContext(LandingPageContext)
    let password_err = null
    let username_err = null
    let confirm_err = null
    let email_exist_err = null

    if(Context.SignupFormError){
        const element = {...Context.SignupFormError[0]}
        if(element.type === 'Email'){
            username_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div style={{marginLeft: '1%'}}>
                        {element.error}
                    </div>
                    
                </main>
            )
        }else if(element.type === 'Password'){
            password_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div>
                        {element.error}
                    </div>
                </main>
            )
        }
        else if(element.type === "EmailGet"){
            email_exist_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div style={{marginLeft: '1%'}}>
                        {element.error}
                    </div>
                </main>
            )
        }
        else{
            confirm_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div>
                            {element.error}
                        </div>
                    </main>
                )
        }
    }

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
                <form onSubmit={Context.SignupSubmitHandler}>
                <main className='signup-input-container'>
                    <label>Email</label>
                    <div className='signup-input-rel'>
                        <input type='email' autoFocus spellCheck='false' className='signup-input' onChange={Context.SignupChangeEmail} value={Context.signup_email} style={(username_err)?{border: '2px solid red'}:{}}/>
                    </div>    
                    {username_err}
                    {email_exist_err}
                    <label>Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.SignupChangePassword} ref={password_ref} value={Context.signup_password} style={(password_err)?{border: '2px solid red'}:{}}/>
                        <PasswordLogo reference={password_ref}/>
                    </div>
                    {password_err}
                    <label>Confirm Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.SignupChangeConfirm} ref={confirm_ref} value={Context.signup_confirm} style={(confirm_err)?{border: '2px solid red'}:{}}/>
                        <PasswordLogo reference={confirm_ref}/>
                    </div>
                    {confirm_err}
                    <label>Phone no</label>
                    <div className='signup-input-rel'>
                        <input type='Phone' spellCheck='false' className='signup-input' onChange={Context.SignupChangePhone} value={Context.signup_phone}/>
                    </div>
                </main>
                <button className='signup-btn'>Continue to e-commerce</button>
                </form>
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
