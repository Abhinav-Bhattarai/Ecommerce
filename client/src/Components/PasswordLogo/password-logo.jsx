import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './password-logo.scss';

const PasswordLogo = (props) => {
    const [password_icon, SetPasswordIcon] = useState(false)
    let jsx = (
        <IconContext.Provider value={{className: 'password-icon'}}>
            <FaEyeSlash/>
        </IconContext.Provider>
    )
    if(password_icon){
        jsx = (
            <IconContext.Provider value={{className: 'password-icon'}}>
                <FaEye/>
            </IconContext.Provider>
        )
    }

    const ChangePasswordIconHandler = ()=>{
        SetPasswordIcon(!password_icon)
        if(props.reference){
            if(password_icon === true){
                props.reference.current.type = 'password'
            }else{
                props.reference.current.type = 'text'
            }
        }
    }

    return (
        <>
            <span onClick={ChangePasswordIconHandler} className='password-logo-icon'>
                {jsx}
            </span>
        </>
    )
}

export default PasswordLogo
