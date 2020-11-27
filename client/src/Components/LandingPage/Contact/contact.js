import React, { Fragment, useContext } from 'react';
import '../Signup/signup.css';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa'
import LandingPageContext from '../../../Containers/LandingPage/LandingPageContext';
import MainPageContext from '../../../Containers/MainPage/MainPageContext';

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
    return (
        <Fragment>
            <main className='signup-container login-container'>
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
                        <input type='text' autoFocus className='signup-input' onChange={(props.type)?Context1.ChangeContactFrom:Context.ChangeContactusFrom} value={(props.type)?Context1.contact_from:Context.contactus_from}/>
                    </div>    
                    <label>Queries / Suggestions</label>
                    <div className='signup-input-rel'>
                        <textarea type='text' className='signup-input contact-input' onChange={(props.type)?Context1.ChangeContactReason:Context.ChangeContactusReason} value={(props.type)?Context1.contact_reason:Context.contactus_reason}/>
                    </div>
                </main>
                <button className='signup-btn'>Send Mail</button>
                </form>          
            </main>
        </Fragment>
    )
};

export default Contact
