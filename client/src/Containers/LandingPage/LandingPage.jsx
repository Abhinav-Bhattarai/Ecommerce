import React, { Fragment, useEffect, useState } from 'react';
import Store from '../../Components/Store/store';
import LandingPageContext from './LandingPageContext';
import uuid from 'react-uuid';
import axios from 'axios';
import { withRouter } from 'react-router';
import StoreContext from '../../Components/Store/StoreContext';
import LogoPage from '../../Components/UI/Logo Page/logo-page';

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
    const [infinite_scroll_num, SetInfiniteScrollNum] = useState(0)
    const [product_list, SetProductList] = useState(null)
    const [wishlist, SetWishlist] = useState(null)
    const [infinite_scroll_status, SetInfiniteScrollStatus] = useState(null)
    const [request_redundancy, SetRequestRedundancy] = useState(false)
    const [spin_status, SetSpinStatus] = useState(false)
    const [loader, SetLoader] = useState(false)
    const [contact_form_error, SetContactFormError] = useState(null)
    const [login_form_error, SetLoginFormError] = useState(null)
    const [signup_form_error, SetSignupFormError] = useState(null)
    const [cancel_token, SetCancelToken] = useState(null)

    const TriggerSignupPopup = ()=>{
        props.history.push(`/${uuid()}/?signup`)
        if(signup_popup){
            SetSignupFormError(null)
        }
        SetSignupPopup(!signup_popup)
    }

    const TriggerLoginPopup = ()=>{
        props.history.push(`/${uuid()}/?login`)
        if(login_popup){
            SetLoginFormError(null)
        }
        SetLoginPopup(!login_popup)
    }

    const TriggerContactPopup = ()=>{
        props.history.push(`/${uuid()}/#contact-us`)
        if(contactus_popup){
            SetContactFormError(null)
        }
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
        if(number_regex.exec(value[value.length - 1]) || value === ''){
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
                const data = repsonse.data
                const invalidity = {invalid_credentials: true}
                const redundancy = {user_redundancy: true}
                if(JSON.stringify(data) !== JSON.stringify(invalidity) && JSON.stringify(data) !== JSON.stringify(redundancy)){
                    SetSignupEmail('')
                    SetSignupPassword('')
                    SetSignupConfirm('')
                    SetSignupPhone('')
                    SetSignupPopup(false)
                    localStorage.clear()
                    localStorage.setItem('User-data', JSON.stringify(data.Data))
                    localStorage.setItem('Email', data.Data.Email)
                    localStorage.setItem('auth-token', data.token)
                    props.ChangeAuthentication(false)
                    // auth function from parent component
                }else{
                    SetSignupFormError([{type: 'EmailGet', error: 'Email already taken. Use some other email'}])
                }
            })
            
        }else{
            // signup submit exception
            if(!email_check){
                SetSignupFormError([{type: 'Email', error: 'Email not found'}])
            }
            else if(!password_check){
                SetSignupFormError([{type: 'Password', error: 'Password must contain 8 characters including number[0-9] and a capital letter [A-Z]'}])
            }
            else{
                SetSignupFormError([{type: 'Confirm', error: "Password doesn't match"}])
            }
        }
    }

    const LoginSubmitHandler = (event)=>{
        event.preventDefault()
        if(login_email.length >= 11 && login_password.length >= 8){
            const context = {
                Email: login_email,
                Password: login_password
            }
            axios.post('/login', context, {cancelToken: cancel_token.token}).then((response)=>{
                const data = response.data
                const invalidity = {invalid_credentials: true}
                if(JSON.stringify(data) !== JSON.stringify(invalidity)){
                    SetLoginEmail('')
                    SetLoginPassword('')
                    SetLoginPopup(false)
                    localStorage.removeItem('WishList')
                    localStorage.clear()
                    localStorage.setItem('User-data', JSON.stringify(data.Data))
                    localStorage.setItem('Email', data.Data.Email)
                    localStorage.setItem('auth-token', data.token)
                    // auth function from parent component
                    props.ChangeAuthentication(false)
                }else{
                    SetLoginFormError([{type:'invalidity', error: 'Invalid Credentials'}])
                }
            }).catch(()=>{
            })
        }else{
            // exceptions
            if(login_email.length < 11){
                SetLoginFormError([{type: 'Email', error: 'Email didnot match'}])
            } 
            else if(login_password.length < 8){
                SetLoginFormError([{type: 'Password', error: 'Password length sould be greater than 8 characters'}])
            }

        }
    }

    useEffect(()=>{
        if(cancel_token === null){
            let token = axios.CancelToken.source()
            SetCancelToken(token)
        }
        return ()=>{
            if(cancel_token) cancel_token.cancel('request cancelled')
        }
    }, [cancel_token])

    const ContactSubmitHandler = (event)=>{
        event.preventDefault()
        if(contact_from.length >= 11 && contact_reason.length >= 20){
            const context = {
                Username: contact_from,
                Message: contact_reason
            }
            axios.post('/contact', context).then((response)=>{})
            SetContactFrom('')
            SetContactReason('')
            SetContactusPopup(false)
        }else{
            if(contact_from.length < 11){
                SetContactFormError([{type: 'Email', error: 'Invalid Email'}])
            }
            else if(contact_reason.length < 20){
                SetContactFormError([{type: 'ReasonError', error: 'Too short description'}])
            }
        }
    }

    const ClearScreenHandler = ()=>{
        if(signup_popup){
            SetSignupPopup(false)
            SetSignupFormError(null)
        }
        if(login_popup){
            SetLoginPopup(false)
            SetLoginFormError(null)
        }
        if(contactus_popup){
            SetContactusPopup(false)
            SetContactFormError(null)
        }
    }

    const InfiniteScroll = ()=>{
        if(request_redundancy === false){
            const WishListArray = [...wishlist]
            axios.get(`/product/${infinite_scroll_num}`).then((response)=>{
                // implementing binary search O(n^2/2)
                const data = [...response.data]
                const main_arr = [...product_list]
                if(data.length >= 1){
                if(data[data.length - 1]._id !== main_arr[main_arr.length - 1]._id){
                    if(WishListArray.length >= 1){
                    let i = 0
                    for(i of WishListArray){
                        const item = i.item_name
                        const item_id = i.item_id
                        const first_letter_wishlist = i.item_name[0]
                        const TotalProductMidIndex = Math.floor(data.length - 1 / 2)
                        const first_letter_total_product_mid_index = data[TotalProductMidIndex].ItemName[0]
                        if(item === data[TotalProductMidIndex]){
                            if(item_id === data[TotalProductMidIndex]._id){
                                data[TotalProductMidIndex].WishListed = true
                            }
                            // match
                        }else{
                            if(first_letter_wishlist > first_letter_total_product_mid_index){
                                // to right search
                                let j = TotalProductMidIndex
                                for(j; j <= data.length - 1; j++){
                                    // condditional loop break
                                    if(item_id === data[j]._id){
                                        data[j].WishListed = true
                                        break
                                    }
                                }
                            }else if(first_letter_wishlist < first_letter_total_product_mid_index){
                                // to left search
                                let k = TotalProductMidIndex
                                for(k; k >= 0; k--){
                                    // conditional loop break
                                    if(item_id === data[k]._id){
                                        data[k].WishListed = true
                                        break
                                    }

                                }
                            }else{
                                let l = 0
                                for(l; l <= data.length; l++){
                                    // conditional loop break
                                    if(item_id === data[l]._id){
                                        data[l].WishListed = true
                                        break
                                    }
                                }
                            }
                    }
                }}
                }}else{
                    SetLoader(false)
                    SetRequestRedundancy(true)
                }
                const dummy = [...product_list]
                data.map((element)=>{
                    dummy.push(element)
                    return null
                })
                SetProductList(dummy)
                SetInfiniteScrollStatus(false)
                SetInfiniteScrollNum(infinite_scroll_num + 1)
                SetLoader(false)  
            })}else{
                SetLoader(false)
            }  
    }

    useEffect(()=>{
        if(product_list === null){
                axios.get(`/product/0`).then((response)=>{
                    const data = [...response.data]
                    // implementing binary search O(n^2/2)
                    if(localStorage.getItem('WishList')){
                    const WishListArray = [...JSON.parse(localStorage.getItem('WishList'))]
                    let i = 0
                    for(i of WishListArray){
                        const item = i.item_name
                        const item_id = i.item_id
                        const first_letter_wishlist = i.item_name[0]
                        const TotalProductMidIndex = Math.floor(data.length - 1 / 2)
                        const first_letter_total_product_mid_index = data[TotalProductMidIndex].ItemName[0]
                        if(item === data[TotalProductMidIndex]){
                            if(item_id === data[TotalProductMidIndex]._id){
                                data[TotalProductMidIndex].WishListed = true
                            }
                            // match
                        }else{
                            if(first_letter_wishlist > first_letter_total_product_mid_index){
                                // to right search
                                let j = TotalProductMidIndex
                                for(j; j <= data.length - 1; j++){
                                    // condditional loop break
                                    if(item_id === data[j]._id){
                                        data[j].WishListed = true
                                        break
                                    }
    
                                }
                            }else if(first_letter_wishlist < first_letter_total_product_mid_index){
                                // to left search
                                let k=TotalProductMidIndex
                                for(k; k >= 0; k--){
                                    // conditional loop break
                                    if(item_id === data[k]._id){
                                        data[k].WishListed = true
                                        break
                                    }
    
                                }
                            }else{
                                let l = 0
                                for(l; l <= data.length; l++){
                                    // conditional loop break
                                    if(item_id === data[l]._id){
                                        data[l].WishListed = true
                                        break
                                    }
                                }
                            }
                        }
                    }
                    SetWishlist(WishListArray)
                    }else{
                        SetSpinStatus(true)
                    }
                    SetProductList(data)
                    SetInfiniteScrollStatus(false)
                    SetInfiniteScrollNum(infinite_scroll_num + 1) 
                })
        }}, // eslint-disable-next-line
    [])

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(infinite_scroll_status === false && product_list){
                if(product_list.length >= 10 && typeof (product_list.length / 10) === "number"){
                 if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                     // calling Infinite Scroll Option
                     SetInfiniteScrollStatus(true)
                 }
             }
        }})
    })
    
    useEffect(()=>{
        if(infinite_scroll_status === true){
            if(loader === false) SetLoader(true)
            InfiniteScroll()
        }
    }, //eslint-disable-next-line 
    [infinite_scroll_status])

    // Side Nav Clicks
    const HomeIconClick = ()=>{
        props.history.push('/e-commerce/home')
    }

    const WishListIconClick = ()=>{
        props.history.push('/e-commerce/wishList')
    }

    const HistoryIconClick = ()=>{
        props.history.push('/e-commerce/history')
    }

    const SoldItemsIconClick = ()=>{
        props.history.push('/e-commerce/soldItems')
    }

    const CartIconClick = ()=>{
        props.history.push('/e-commerce/cartItems')
    }

        
    const TriggerWishlist = (e, wishlist_triggered, item_id, item_name)=>{
        if(wishlist_triggered === false){
            e.target.style.color = ' #ff385c'
            const dummy = [...wishlist]
            dummy.push({item_id, item_name})
            SetWishlist(dummy)
            localStorage.setItem('WishList', JSON.stringify(dummy))
        }else{
            e.target.style.color = 'grey'
            const dummy = [...wishlist]
            dummy.push({item_id, item_name})
            SetWishlist(dummy)
            localStorage.setItem('WishList', JSON.stringify(dummy))
        }
    }


    return (
        <Fragment>
            {(spin_status)?
            <div>
                <StoreContext.Provider value={{
                        HomeIconClick,
                        WishListIconClick,
                        HistoryIconClick,
                        SoldItemsIconClick,
                        CartIconClick,
                        WishListItems: wishlist,
                        TotalItems: product_list
                }}>
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
                    SubmitLoginHandler: (e)=>{LoginSubmitHandler(e)},
                    contactus_from: contact_from,
                    contactus_reason: contact_reason,
                    ChangeContactusFrom: (e)=>{ChangeContactFrom(e)},
                    ChangeContactusReason: (e)=>{ChangeContactReason(e)},
                    SubmitContact: (e)=>{ContactSubmitHandler(e)},
                    Triggerwishlist: (e, wishlist, item_id, item_name)=>TriggerWishlist(e, wishlist, item_id, item_name),
                    SignInFormError: login_form_error,
                    SignupFormError: signup_form_error,
                    ContactFormError: contact_form_error,
                }}>
                    <Store/>
                </LandingPageContext.Provider>
                </StoreContext.Provider>
            </div>:<LogoPage/>}
        </Fragment>
    )
}

export default React.memo(withRouter(LandingPage))
