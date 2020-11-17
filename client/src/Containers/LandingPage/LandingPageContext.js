import React from 'react';

const LandingPageContext = React.createContext({
    TriggerSignupPopup: ()=>{},
    TriggerLoginPopup: ()=>{},
    Signup_state: false,
    Login_state: false
})

export default LandingPageContext