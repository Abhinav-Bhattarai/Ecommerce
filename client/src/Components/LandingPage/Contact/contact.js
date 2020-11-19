import React, { Fragment, useContext } from 'react';
import '../Signup/signup.css';
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

const Contact = () => {
    const Context = useContext(LandingPageContext)
    return (
        <Fragment>
            <main className='signup-container login-container'>
                <header className='signup-header'>
                    <span onClick={Context.TriggerContactPopup}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Contact us from here</div>
                </header>
                <form onSubmit={Context.SubmitContact}>
                <main className='signup-input-container'>
                    <label>From</label>
                    <div className='signup-input-rel'>
                        <input type='text' autoFocus className='signup-input' onChange={Context.ChangeContactusFrom} value={Context.contactus_from}/>
                    </div>    
                    <label>Queries / Suggestions</label>
                    <div className='signup-input-rel'>
                        <textarea type='text' className='signup-input contact-input' onChange={Context.ChangeContactusReason} value={Context.contactus_reason}/>
                    </div>
                </main>
                <button className='signup-btn'>Send Mail</button>
                </form>          
            </main>
        </Fragment>
    )
};

export default Contact
