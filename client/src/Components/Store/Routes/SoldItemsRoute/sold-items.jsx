import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './sold-items.scss';
import Spinner from '../../../UI/Spinner/spinner';

const SoldItem = () => {
    const [spinner, SetSpinner] = useState(true)
    const [data, SetData] = useState(null)

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

    let spinner_jsx = null
    if(spinner){
        spinner_jsx = <Spinner/>
    }

    let jsx = null
    if(!data && spinner === false){
        jsx = <div style={{textAlign: "center", color: "black", fontSize: "20px"}}>NO TRANSACTION'S</div>
    }
    return (
       <Fragment>
            <main className='product-history-container'>
                {jsx}
                {spinner_jsx}
            </main>
       </Fragment>
    )
}

export default SoldItem
