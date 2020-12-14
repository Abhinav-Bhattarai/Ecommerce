import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './sold-items.scss';
import Spinner from '../../../UI/Spinner/spinner';

const SoldItem = () => {
    const [spinner, SetSpinner] = useState(false)
    const [data, SetData] = useState(null)

    let product_cards_jsx = null

    useEffect(() => {
        SetSpinner(true)
        axios.get(`/sold-item/${localStorage.getItem('Email')}`).then((response)=>{
            const err = {invalid: true}
            if(JSON.stringify(err) !== JSON.stringify(response.data)){
                SetData(response.data)
            }
             SetSpinner(false)
        })
    }, []);

    if(data){

    }

    if(data === null && spinner === false){
        product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>NO RECENT TRANSACTIONS</div>
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

export default SoldItem
