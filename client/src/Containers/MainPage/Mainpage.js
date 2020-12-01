import React, { Fragment, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import dotenv from 'dotenv';
import axios from 'axios';
import MainPageContext from './MainPageContext';
import Store from '../../Components/Store/store';
import { withRouter } from 'react-router';
import uuid from 'react-uuid';
import StoreContext from '../../Components/Store/StoreContext';

dotenv.config()

const Mainpage = (props) => {

    const [socket, SetSocket] = useState(null)
    const [infinite_scroll_num, SetInfiniteScrollNum] = useState(0)
    const [product_list, SetProductList] = useState(null)
    const [wishlist, SetWishlist] = useState([])
    const [infinite_scroll_status, SetInfiniteScrollStatus] = useState(null)
    const [contact_from, SetContactFrom] = useState('')
    const [contact_reason, SetContactReason] = useState('')
    const [contactus_popup, SetContactusPopup] = useState(false)
    const [product_img, SetProductImage] = useState('')
    const [product_name, SetProductName] = useState('')
    const [product_price, SetProductPrice] = useState('')
    const [product_desc, SetProductDesc] = useState('')
    const [request_redundancy, SetRequestRedundancy] = useState(false)
    const InputFile = useRef(null)

    useEffect(()=>{
        const connection = io.connect(process.env.PROXY, {query: {username: localStorage.getItem('Email')}})
        SetSocket(connection)
    }, [])

    useEffect(()=>{
        if(socket){
            socket.on('receiver', ()=>{

            })

            return ()=>{
                socket.off('receiver')
            }
        }
    })

    // FileEncoder To Binary Bit64 and need to apply onChange event listener
    const FileEncoder = (event)=>{
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = ()=>{
            SetProductImage(reader.result)
            axios.post('/file', {result: reader.result}).then((response)=>{
            })
            const context = {
                Seller: localStorage.getItem('Email'),
                Price: '8000',
                ItemName: 'Something',
                ProductImage: reader.result,
                Description: "A product description is the marketing copy used to describe a product's value proposition to potential customers. A compelling product description provides customers with details around features, problems it solves and other benefits to help generate a sale. ... A “good” product description will not do."
            }
            axios.post('/product', context).then((response)=>{})
        }
        reader.readAsDataURL(file)
    }

    const ChangeProductName = (event)=>{
        const value = event.target.value
        SetProductName(value)
    }

    const ChangeProductPrice = (event)=>{
        const value = event.target.value
        SetProductPrice(value)
    }

    const ChangeProductDesc = (event)=>{
        const value = event.target.value
        SetProductDesc(value)
    }

    const SubmitProductForSaleHandler = (event)=>{
        event.preventDefault()
        const Context = {
            Seller: localStorage.getItem('Email'),
            Price: product_price,
            Description: product_desc,
            ItemName: product_name,
            Image: product_img
        }
        axios.post('/product', Context).then((response)=>{})
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
                                data[TotalProductMidIndex].Wishlisted = true
                            }
                            // match
                        }else{
                            if(first_letter_wishlist > first_letter_total_product_mid_index){
                                // to right search
                                let j = TotalProductMidIndex
                                for(j; j <= data.length - 1; j++){
                                    // condditional loop break
                                    if(item_id === data[j]._id){
                                        data[j].Wishlisted = true
                                    }
                                }
                            }else{
                                // to left search
                                let k = TotalProductMidIndex
                                for(k; k >= 0; k--){
                                    // conditional loop break
                                    if(item_id === data[k]._id){
                                        data[k].Wishlisted = true
                                    }

                                }
                            }
                    }
                }}
                }}else{
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

            })}
    }

    const TriggerContactPopup = ()=>{
        props.history.push(`/${uuid()}/#contact-us`)
        SetContactusPopup(!contactus_popup)
    }

    const ChangeContactFrom = (event)=>{
        const value = event.target.value
        SetContactFrom(value)
    }

    const ChangeContactReason = (event)=>{
        const value = event.target.value
        SetContactReason(value)
    }

    useEffect(()=>{
        if(product_list === null){
        if(localStorage.getItem('WishList')){
            const WishListArray = [...JSON.parse(localStorage.getItem('WishList'))]
            axios.get(`/product/0`).then((response)=>{
                const data = [...response.data]
                // implementing binary search O(n^2/2)
                let i = 0
                for(i of WishListArray){
                    const item = i.item_name
                    const item_id = i.item_id
                    const first_letter_wishlist = i.item_name[0]
                    const TotalProductMidIndex = Math.floor(data.length - 1 / 2)
                    const first_letter_total_product_mid_index = data[TotalProductMidIndex].ItemName[0]
                    if(item === data[TotalProductMidIndex]){
                        if(item_id === data[TotalProductMidIndex]._id){
                            data[TotalProductMidIndex].Wishlisted = true
                        }
                        // match
                    }else{
                        if(first_letter_wishlist > first_letter_total_product_mid_index){
                            // to right search
                            let j = TotalProductMidIndex
                            for(j; j <= data.length - 1; j++){
                                // condditional loop break
                                if(item_id === data[j]._id){
                                    data[j].Wishlisted = true
                                }

                            }
                        }else{
                            // to left search
                            let k=TotalProductMidIndex
                            for(k; k >= 0; k--){
                                // conditional loop break
                                if(item_id === data[k]._id){
                                    data[k].Wishlisted = true
                                }

                            }
                        }
                    }
                }

                SetWishlist(WishListArray)
                SetProductList(data)
                SetInfiniteScrollStatus(false)
                SetInfiniteScrollNum(infinite_scroll_num + 1) 
            })
        }else{
            axios.get(`/wishlist/${localStorage.getItem('Email')}`).then((wishlist)=>{
                const WishListArray = [...wishlist.data]
                axios.get('/product/0').then((response)=>{
                    const data = [...response.data]
                    if(data.length >= 1){
                    if(WishListArray.length >= 1){
                    localStorage.setItem('WishList', WishListArray)
                    // implementing binary search O(n^2/2)
                    let i = 0
                    for(i of WishListArray){
                        const item = i.item_name
                        const item_id = i.item_id
                        const first_letter_wishlist = i.item_name[0]
                        const TotalProductMidIndex = Math.floor(data.length - 1 / 2)
                        const first_letter_total_product_mid_index = data[TotalProductMidIndex].ItemName[0]
                        if(item === data[TotalProductMidIndex]){
                            if(item_id === data[TotalProductMidIndex]._id){
                                data[TotalProductMidIndex].Wishlisted = true
                            }
                            // match
                        }else{
                            if(first_letter_wishlist > first_letter_total_product_mid_index){
                                // to right search
                                let j = TotalProductMidIndex
                                for(j; j <= data.length - 1; j++){
                                    // condditional loop break
                                    if(item_id === data[j]._id){
                                        data[j].Wishlisted = true
                                    }
    
                                }
                            }else{
                                // to left search
                                let k=TotalProductMidIndex
                                for(k; k >= 0; k--){
                                    // conditional loop break
                                    if(item_id === data[k]._id){
                                        data[k].Wishlisted = true
                                    }
                                }
                            }
                        }
                    }
                    }
                    SetWishlist(WishListArray)
                    SetProductList(data)
                    SetInfiniteScrollStatus(false)
                    SetInfiniteScrollNum(infinite_scroll_num + 1) 
                    }
                })//
            })
        }}
    }, // eslint-disable-next-line
    []) 

    useEffect(()=>{
       window.addEventListener('scroll', ()=>{
           if(infinite_scroll_status === false && product_list){
               if(typeof (product_list.length / 2) === "number"){
                if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    // calling Infinite Scroll Option
                    SetInfiniteScrollStatus(true)
                }
            }
            }   
       })
    })

    useEffect(()=>{
        if(infinite_scroll_status === true){
            InfiniteScroll()
        }
    }, //eslint-disable-next-line 
    [infinite_scroll_status])

    const ClearScreenHandler = ()=>{
        if(contactus_popup){
            SetContactusPopup(false)
        }
    }

    const ContactSubmitHandler = (event)=>{
        event.preventDefault()
        if(contact_from.length >= 11 && contact_reason.length >= 10){
            const context = {
                Username: contact_from,
                Message: contact_reason
            }
            axios.post('/contact', context).then((response)=>{})
            SetContactFrom('')
            SetContactReason('')
            SetContactusPopup(false)
        }
    }

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
        InputFile.current.click()
        props.history.push('/e-commerce/cartItems')
    }

            
    const TriggerWishlist = (e, wishlist_triggered, item_id, item_name)=>{
        if(wishlist_triggered === false){
            e.target.style.color = ' #ff385c'
            const dummy = [...wishlist]
            dummy.push({item_id, item_name})
            SetWishlist(dummy)
            localStorage.setItem('WishList', JSON.stringify(dummy))
            // further axios request
            const context = {
                item_name,
                item_id,
                email: localStorage.getItem('Email')
            }
            axios.put('/wishlist/add', context).then((response)=>{
            })
        }else{
            e.target.style.color = 'grey'
            const dummy = [...wishlist]
            const index = dummy.findIndex((e)=>{return e.item_id === item_id})
            dummy.splice(index, 1)
            SetWishlist(dummy)
            localStorage.setItem('WishList', JSON.stringify(dummy))
            // further axios request
            const context = {
                item_name,
                item_id,
                email: localStorage.getItem('Email')
            }
            axios.put('/wishlist/remove', context).then((response)=>{
            })
        }
    }


    return (
        <Fragment>
            <StoreContext.Provider value={{
                HomeIconClick,
                WishListIconClick,
                HistoryIconClick,
                SoldItemsIconClick,
                CartIconClick,
                WishListItems: wishlist,
                TotalItems: product_list
            }}>
                <MainPageContext.Provider value={{
                    FileEncoder: (e)=>{FileEncoder(e)},
                    ChangeContactFrom: (e)=>ChangeContactFrom(e),
                    ChangeContactReason: (e)=>ChangeContactReason(e),
                    TriggerContactPopup: TriggerContactPopup,
                    contact_from: contact_from,
                    contactus_popup: contactus_popup,
                    contact_reason: contact_reason,
                    ClearScreenHandler,
                    SubmitProductForSaleHandler: (e)=>SubmitProductForSaleHandler(e),
                    ChangeProductName: (e)=>ChangeProductName(e),
                    ChangeProductDesc: (e)=>ChangeProductDesc(e),
                    ChangeProductPrice: (e)=>ChangeProductPrice(e),
                    SubmitContactHandler: (e)=>ContactSubmitHandler(e),
                    TriggerWishList: (e, status, item_name, item_id)=>TriggerWishlist(e, status, item_name, item_id),
                    product_name,
                    product_desc,
                    product_img,
                    product_price
                }}>
                    <Store type="MainPage"/>
                </MainPageContext.Provider>
            </StoreContext.Provider>
            <input type='file' hidden onChange={FileEncoder} ref={InputFile}/>

        </Fragment>
    )
}

export default withRouter(Mainpage)
