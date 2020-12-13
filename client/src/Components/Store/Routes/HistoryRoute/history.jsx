import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import Spinner from '../../../UI/Spinner/spinner';

const History = () => {
    const [spinner, SetSpinner] = useState(false)
    const [data, SetData] = useState(null)

    let product_cards_jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>SORRY</div>

    useEffect(() => {
        SetSpinner(true)
        axios.get(`/history/${localStorage.getItem('Email')}`).then((response)=>{
            const err = {invalid: true}
            if(JSON.stringify(err) !== JSON.stringify(response.data)){
                SetData(response.data)
                SetSpinner(false)
            }
        })
    }, []);

    if(data){

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
