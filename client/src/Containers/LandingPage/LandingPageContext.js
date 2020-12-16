import React from 'react';

const LandingPageContext = React.createContext({
    TriggerSignupPopup: ()=>{},
    TriggerLoginPopup: ()=>{},
    Signup_state: false,
    Login_state: false,
    Contactus_state: false,
    ClearScreenHandler: ()=>{},
    TriggerContactPopup: ()=>{},
    signup_email: '',
    signup_password: '',
    signup_confirm: '',
    signup_phone: '',
    SignupChangeEmail: ()=>{},
    SignupChangePassword: ()=>{},
    SignupChangeConfirm: ()=>{},
    SignupChangePhone: ()=>{},
    SignupSubmitHandler: ()=>{},
    login_email: '',
    login_password: '',
    LoginChangeEmail: ()=>{},
    LoginChangePassword: '',
    SubmitLoginHandler: ()=>{},
    contactus_from: '',
    contactus_reason: '',
    ChangeContactusFrom: ()=>{},
    ChangeContactusReason: ()=>{},
    SubmitContact: ()=>{},
    Triggerwishlist: ()=>{},
    SignInFormError: null,
    SignupFormError: null,
    ContactFormError: null,

})

export default LandingPageContext