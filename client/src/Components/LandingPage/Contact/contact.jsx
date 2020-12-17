import React, { Fragment, useContext } from 'react';
import '../Signup/signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa'
import LandingPageContext from '../../../Containers/LandingPage/LandingPageContext';
import MainPageContext from '../../../Containers/MainPage/MainPageContext';
import {ErrIcon} from '../Signin/login'

const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

const Contact = (props) => {
    const Context = useContext(LandingPageContext)
    const Context1 = useContext(MainPageContext)

    let response_err = null
    let username_err = null

    if(Context.ContactFormError){
        const element = {...Context.ContactFormError[0]}
        if(element.type === 'Email'){
            username_err = (
                <main className='contact-error'>
                    <ErrIcon/>
                    <div style={{marginLeft: '1%'}}>
                        {element.error}
                    </div>
                    
                </main>
            )
        }else{
            response_err = (
                <main className='contact-error'>
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
            <main className='signup-container login-container contact-container'>
                <header className='signup-header'>
                    <span onClick={(props.type)?Context1.TriggerContactPopup:Context.TriggerContactPopup}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Contact us from here</div>
                </header>
                <form onSubmit={(props.type)?Context1.SubmitContactHandler:Context.SubmitContact}>
                <main className='signup-input-container'>
                    <label>From</label>
                    <div className='signup-input-rel'>
                        <input type='text' className='signup-input' spellCheck="false" onChange={(props.type)?Context1.ChangeContactFrom:Context.ChangeContactusFrom} value={(props.type)?Context1.contact_from:Context.contactus_from} style={(username_err)?{border: '2px solid red'}:{}}/>
                    </div>    
                    {username_err}
                    <label>Queries / Suggestions</label>
                    <div className='signup-input-rel'>
                        <textarea type='text' autoFocus spellCheck="false" className='signup-input contact-input' onChange={(props.type)?Context1.ChangeContactReason:Context.ChangeContactusReason} value={(props.type)?Context1.contact_reason:Context.contactus_reason} style={(response_err)?{border: '2px solid red'}:{}}/>
                    </div>
                    {response_err}
                </main>
                <button className='signup-btn'>Send Mail</button>
                </form>          
            </main>
        </Fragment>
    )
};

export default Contact
