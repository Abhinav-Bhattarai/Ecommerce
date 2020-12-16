import React, { Fragment, useContext } from 'react';
import '../Signup/signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa'
import LandingPageContext from '../../../Containers/LandingPage/LandingPageContext';

export const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

export const ErrIcon = ()=>{
    return (
        <IconContext.Provider value={{style:{color: 'red', marginRight: '1%'}}}>
            <FaExclamationCircle/>
        </IconContext.Provider>
    )
}

const Login = () => {
    const Context = useContext(LandingPageContext)
    let password_err = null
    let username_err = null
    let invalid_cred_err = null

    if(Context.SignInFormError){
        const element = {...Context.SignInFormError[0]}
        if(element.type === 'Email'){
            username_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div style={{marginLeft: '1%'}}>
                        {element.error}
                    </div>
                    
                </main>
            )
        }
        else if(element.type === 'invalidity'){
            invalid_cred_err = (
                <main className='login-error'>
                    <ErrIcon/>
                    <div>
                        {element.error}
                    </div>
                </main>
            )
        }
        else{
            password_err = (
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
            <main className='signup-container login-container'>
                <header className='signup-header'>
                    <span onClick={Context.TriggerLoginPopup}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Login to Continue</div>
                </header>
                <form onSubmit={Context.SubmitLoginHandler}>
                <main className='signup-input-container'>
                    <label>Email</label>
                    <div className='signup-input-rel'>
                        <input type='email' spellCheck='false' autoFocus className='signup-input' onChange={Context.LoginChangeEmail} value={Context.login_email} style={(username_err || invalid_cred_err)?{'border': '2px solid red'}:{}}/>
                    </div>    
                    {username_err}
                    {invalid_cred_err}
                    <label>Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.LoginChangePassword} value={Context.login_password} style={(password_err || invalid_cred_err)?{'border': '2px solid red'}:{}}/>
                    </div>
                    {password_err}
                    {invalid_cred_err}
                </main>
                <button className='signup-btn'>Continue</button>
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

export default Login
