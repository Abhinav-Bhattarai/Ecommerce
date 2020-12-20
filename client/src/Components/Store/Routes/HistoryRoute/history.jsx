import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './history.scss';
import Spinner from '../../../UI/Spinner/spinner';

const History = () => {
    const [spinner, SetSpinner] = useState(false)
    const [data, SetData] = useState(null)

    let product_cards_jsx = null
    const auth_status = JSON.parse(localStorage.getItem('authentication-status'))
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('authentication-status')) === true){
            SetSpinner(true)
            axios.get(`/history/${localStorage.getItem('auth-token')}/${localStorage.getItem('Email')}`).then((response)=>{
                const err = {invalid: true}
                if(JSON.stringify(err) !== JSON.stringify(response.data)){
                    if(response.data.length >= 1){
                        SetData(response.data)
                    }
                }
                SetSpinner(false)
            })
        }
    }, []);

    if(data && auth_status === true){
        
    }

    if(spinner === false && data === null && auth_status === true){
        product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>SORRY</div>
    }

    let spinner_jsx = null
    if(spinner){
        spinner_jsx = <Spinner/>
    }
    return (
       <Fragment>
            <main className='product-history-container'>
                {product_cards_jsx}
                {spinner_jsx}
            </main>
       </Fragment>
    )
}

export default History
