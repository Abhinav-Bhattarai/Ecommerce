import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()

const Mainpage = () => {

    const [socket, SetSocket] = useState(null)
    const [infinite_scroll_num, SetInfiniteScrollNum] = useState(0)
    const [product_list, SetProductList] = useState(null)
    const [wishlist, SetWishlist] = useState([])
    const [infinite_scroll_status, SetInfiniteScrollStatus] = useState(false)

    useEffect(()=>{
        // socket client connections
        const username = localStorage.getItem('email')
        const ENDPOINT = process.env.PROXY;
        const connection = io.connect(ENDPOINT, {query: {username}})
        connection.emit('join', username)
        SetSocket(connection)
        // axios requests for search algorithm maybe and other things also external endpoints
        axios.get(`/check/${localStorage.getItem('token')}`).then((response)=>{
            const data = response.data
            console.log(data)
        })
        
    }, [])

    useEffect(()=>{
        // socket receiver / listerner
        socket.on('client-receiver', (sender, msg)=>{

        })
        return ()=>{
            // reduces socket redundancy
            socket.off('client-receiver')
        }
    })

    
    // FileEncoder To Binary Bit64 and need to apply onChange event listener
    const FileEncoder = (event)=>{
        const file = event.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onloadend = ()=>{
            console.log(reader.result)
        }
        reader.readAsDataURL(file)
    }
    

    const InfiniteScroll = ()=>{
        if(wishlist.length >= 1){
            const WishListArray = [wishlist]
            axios.get(`/products/${infinite_scroll_num}`).then((response)=>{
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
                            let k = TotalProductMidIndex
                            for(k; k >= 0; k--){
                                // conditional loop break
                                if(item_id === data[k]._id){
                                    data[k].Wishlisted = true
                                }

                            }
                        }
                    }
                }
                const dummy = [...product_list]
                data.map((element)=>{
                    dummy.push(element)
                })
                SetProductList(dummy)
                SetInfiniteScrollStatus(false)
                SetInfiniteScrollNum(infinite_scroll_num + 1) 
            })
        }else{

        }
    }

    useEffect(()=>{
      if(product_list === null){
        if(localStorage.getItem('WishList')){
            const WishListArray = [...localStorage.getItem('WishList')]
            axios.get(`/products/0`).then((response)=>{
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

                SetProductList(data)
                SetInfiniteScrollStatus(false)
                SetInfiniteScrollNum(infinite_scroll_num + 1) 
            })
        }else{
            axios.get(`/wishlist/${localStorage.getItem('Email')}`).then((wishlist)=>{
                const WishListArray = [...wishlist.data]
                axios.get(`/products/0`).then((response)=>{
                    const data = [...response.data]

                    if(WishListArray.length >= 1){
                    // implementing binary search O(n^2/2)
                    localStorage.removeItem('WishList')
                    localStorage.setItem('WishList', WishListArray)
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
                    SetProductList(data)
                    SetInfiniteScrollStatus(false)
                    SetInfiniteScrollNum(infinite_scroll_num + 1) 
                })//
            })
        }}
    }, [])

    useEffect(()=>{
       window.addEventListener('scroll', ()=>{
           if(infinite_scroll_status === false){
                if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    // calling Infinite Scroll Option
                    SetInfiniteScrollStatus(true)
                    InfiniteScroll()
                }
            }   
       })
    })

    return (
        <Fragment>

        </Fragment>
    )
}

export default Mainpage
