import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import './fullproduct.scss';
import { withRouter } from 'react-router';

const FullProduct = (props) => {

    const [data, Setdata] = useState(props.data?props.data:null)
    const [invalidity, SetInvalidity] = useState(false)

    useEffect(()=>{
        if(props.data === null){
            axios.get(`/alternate-product-search/${props.match.params.id}`).then((response)=>
            {
                // invalidity
                if(response.data === {invalid_id: true}){
                    SetInvalidity(true)
                }else{
                    Setdata(response.data)
                }
            })
        }
    }, // eslint-disable-next-line
    [])

    let product_jsx = null
    if(data){
        product_jsx = (
            <div className='full-product-image-container'>
                <img src={data.ProductImage} alt='product-desc'/>
            </div>    
        )
    }

    return (
        <Fragment>
           {(invalidity === false)?(
                <div className='fullproduct-container'>
                    {product_jsx}
                </div>
           ):null}
        </Fragment>
    )
}

export default withRouter(FullProduct)
