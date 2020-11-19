import React, { Fragment, useState } from 'react';
import Store from '../../Components/Store/store';
import LandingPageContext from './LandingPageContext';
import uuid from 'react-uuid';
import axios from 'axios';

const LandingPage = (props) => {

    const [signup_popup, SetSignupPopup] = useState(false)
    const [login_popup, SetLoginPopup] = useState(false)
    const [contactus_popup, SetContactusPopup] = useState(false)
    const [signup_email, SetSignupEmail] = useState('')
    const [signup_password, SetSignupPassword] = useState('')
    const [signup_confirm, SetSignupConfirm] = useState('')
    const [signup_phone, SetSignupPhone] = useState('')
    const [login_email, SetLoginEmail] = useState('')
    const [login_password, SetLoginPassword] = useState('')
    const [contact_from, SetContactFrom] = useState('')
    const [contact_reason, SetContactReason] = useState('')

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

    const ChangeSignupEmail = (event)=>{
        const value = event.target.value
        SetSignupEmail(value)
    }

    const ChangeSignupPassword = (event)=>{
        const value = event.target.value
        SetSignupPassword(value)
    }

    const ChangeSignupConfirm = (event)=>{
        const value = event.target.value
        SetSignupConfirm(value)
    }

    const ChangeSignupNumber = (event)=>{
        const value = event.target.value
        const number_regex = /[0-9]/
        if(number_regex.exec(value[value.length - 1])){
            SetSignupPhone(value)
        }
    }

    const ChangeLoginEmail = (event)=>{
        const value = event.target.value
        SetLoginEmail(value)
    }

    const ChangeLoginPassword = (event)=>{
        const value = event.target.value
        SetLoginPassword(value)
    }

    const ChangeContactFrom = (event)=>{
        const value = event.target.value
        SetContactFrom(value)
    }

    const ChangeContactReason = (event)=>{
        const value = event.target.value
        SetContactReason(value)
    }

    const SignupSubmitHandler = (event)=>{
        event.preventDefault()
        let email_check = false
        if(signup_email.length >= 11){
            email_check = true
        }
        let password_check = false
        let confirm_check = false
        if(signup_password.length >= 8){
            const Number_regex = /[0-9]/
            const UpperCaseRegex = /[A-Z]/
            if(Number_regex.exec(signup_password) !== null && UpperCaseRegex.exec(signup_password) !== null){
                password_check = true
                if(signup_password === signup_confirm){
                    confirm_check = true
                }
            }
        }
        if(email_check && password_check && confirm_check){
            // further axios request
            const context = {
                Email: signup_email,
                Password: signup_password,
                Confirm: signup_confirm,
                Phone: signup_phone
            }

            axios.post('/register', context).then((repsonse)=>{
                console.log(repsonse.data)
                 // const invalidity = {invalid_credentials: true}
                SetSignupEmail('')
                SetSignupPassword('')
                SetSignupConfirm('')
                SetSignupPhone('')
                SetSignupPopup(false)
            })
            
        }
    }

    const LoginSubmitHandler = (event)=>{
        event.preventDefault()
        if(login_email.length >= 11 && login_password.length >= 8){
            const context = {
                Email: login_email,
                Password: login_password
            }
            axios.post('/login', context).then((response)=>{
                console.log(response.data)
                SetLoginEmail('')
                SetLoginPassword('')
                SetLoginPopup(false)
                // const invalidity = {invalid_credentials: true}
            })
        }
    }

    const ContactSubmitHandler = (event)=>{
        event.preventDefault()
        console.log('hello from outside')
        if(contact_from.length >= 11 && contact_reason.length >= 10){
            const context = {
                Username: contact_from,
                Message: contact_reason
            }
            console.log('hello')
            axios.post('/contact', context).then((response)=>{
                console.log(response.data)
                SetContactFrom('')
                SetContactReason('')
                SetContactusPopup(false)
            })
        }
    }

    const ClearScreenHandler = ()=>{
        if(signup_popup){
            SetSignupPopup(false)
        }
        if(login_popup){
            SetLoginPopup(false)
        }
        if(contactus_popup){
            SetContactusPopup(false)
        }
    }

    return (
        <Fragment>
            <LandingPageContext.Provider value={{
                TriggerSignupPopup: TriggerSignupPopup,
                TriggerLoginPopup: TriggerLoginPopup,
                Signup_state: signup_popup,
                Login_state: login_popup,
                Contactus_state: contactus_popup,
                ClearScreenHandler: ClearScreenHandler,
                TriggerContactPopup: TriggerContactPopup,
                signup_email: signup_email,
                signup_password,
                signup_confirm: signup_confirm,
                signup_phone,
                login_email,
                login_password,
                SignupChangeEmail: (e)=>{ChangeSignupEmail(e)},
                SignupChangePassword: (e)=>{ChangeSignupPassword(e)},
                SignupChangeConfirm: (e)=>{ChangeSignupConfirm(e)},
                SignupChangePhone: (e)=>{ChangeSignupNumber(e)},
                LoginChangeEmail: (e)=>{ChangeLoginEmail(e)},
                LoginChangePassword: (e)=>{ChangeLoginPassword(e)},
                SignupSubmitHandler: (e)=>{SignupSubmitHandler(e)},
                LoginSubmitHandler: (e)=>{LoginSubmitHandler(e)},
                contactus_from: contact_from,
                contactus_reason: contact_reason,
                ChangeContactusFrom: (e)=>{ChangeContactFrom(e)},
                ChangeContactusReason: (e)=>{ChangeContactReason(e)},
                SubmitContact: (e)=>{ContactSubmitHandler(e)}
            }}>
                <Store/>
            </LandingPageContext.Provider>
        </Fragment>
    )
}

export default LandingPage
