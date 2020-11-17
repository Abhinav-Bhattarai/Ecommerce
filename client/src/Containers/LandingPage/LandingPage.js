import React, { Fragment, useState } from 'react';
import Store from '../../Components/Store/store';
import LandingPageContext from './LandingPageContext';
import uuid from 'react-uuid';

const LandingPage = (props) => {

    const [signup_popup, SetSignupPopup] = useState(false)
    const [login_popup, SetLoginPopup] = useState(false)
    const [contactus_popup, SetContactusPopup] = useState(false)

    const TriggerSignupPopup = ()=>{
        props.history.push(`/${uuid()}/?signup`)
        SetSignupPopup(!signup_popup)
    }

    const TriggerLoginPopup = ()=>{
        props.history.push(`/${uuid()}/?login`)
        SetLoginPopup(!login_popup)
    }

    const TriggerContactPopup = ()=>{
        props.history.push(`/${uuid()}/#contact-us`)
        SetContactusPopup(!contactus_popup)
    }

    const ClearScreenHandler = ()=>{
        if(signup_popup){
            SetSignupPopup(false)
        }
        if(login_popup){
            SetLoginPopup(false)
        }
    }

    return (
        <Fragment>
            <LandingPageContext.Provider value={{
                TriggerSignupPopup: TriggerSignupPopup,
                TriggerLoginPopup: TriggerLoginPopup,
                Signup_state: signup_popup,
                Login_state: login_popup,
                ClearScreenHandler: ClearScreenHandler,
                TriggerContactPopup: TriggerContactPopup
            }}>
                <Store/>
            </LandingPageContext.Provider>
        </Fragment>
    )
}

export default LandingPage
