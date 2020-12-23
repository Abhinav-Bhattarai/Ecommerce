import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MainPageContext from './MainPageContext';
import Store from '../../Components/Store/store';
import { withRouter } from 'react-router';
import uuid from 'react-uuid';
import StoreContext from '../../Components/Store/StoreContext';
import LogoPage from '../../Components/UI/Logo Page/logo-page';

const Mainpage = (props) => {

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
    const [loader, SetLoader] = useState(false)
    const InputFile = useRef(null)
    const [spin_status, SetSpinStatus] = useState(false)
    const [cart_items, SetCartItems] = useState(null)
    const [logout_popup, SetLogoutPopup] = useState(false)
    const [product_list_err, SetProductListError] = useState([])

    // FileEncoder To Binary Bit64 and need to apply onChange event listener
    const FileEncoder = (event)=>{
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = ()=>{
            SetProductImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const ChangeProductName = (event)=>{
        const value = event.target.value
        SetProductName(value)
    }

    const ChangeProductPrice = (event)=>{
        const value = event.target.value
        const num_regex = /[0-9]/
        if(num_regex.exec(value) !== null || value === ''){
            SetProductPrice(value)
        }
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
        if(parseInt(product_price) >= 10 && product_desc.length >= 30 && product_name >= 3 && product_img.length >= 100){
            axios.post('/product', Context).then((response)=>{})
        }else{
            const dummy = [...product_list_err]
            if(parseInt(product_price) < 10 || product_price.length === 0){
                dummy.push({type: 'Price', error: 'Minimum price is 10$'})
            }
            if(product_desc.length < 30){
                dummy.push({type: 'Desc', error: 'Minimum description length is 30 chars'})
            }
            if(product_name < 3){
                dummy.push({type: 'Name', error: 'Minimum Product-name is 3 chars'})
            }
            if(product_img.length < 100){
                dummy.push({type: 'Image', error: 'Product Image is not added'})
            }
            SetProductListError(dummy)
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

    const TriggerContactPopup = ()=>{
        props.history.push(`/${uuid()}/#contact-us`)
        SetContactFrom(localStorage.getItem('Email'))
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
                SetSpinStatus(true)
                }else{
                    SetSpinStatus(true)
                }

                SetWishlist(WishListArray)
                SetProductList(data)
                SetInfiniteScrollStatus(false)
                SetInfiniteScrollNum(infinite_scroll_num + 1) 
            })
        }else{
            axios.get(`/wishlist/${localStorage.getItem('auth-token')}/${localStorage.getItem('Email')}`).then((wishlist)=>{
                const WishListArray = [...wishlist.data]
                axios.get('/product/0').then((response)=>{
                    const data = [...response.data]
                    if(data.length >= 1){
                    if(WishListArray.length >= 1){
                    localStorage.setItem('WishList', JSON.stringify(WishListArray))
                    // implementing binary search O(n^2/2) complexity = O(1) >= O(n) <= 100
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
                                for(l; l <= data.length - 1; l++){
                                    // conditional loop break
                                    if(item_id === data[l]._id){
                                        data[l].WishListed = true
                                        break
                                    }
                                }
                            }
                        }
                    }
                    SetSpinStatus(true)
                    }else{
                        SetSpinStatus(true)
                    }
                    SetWishlist(WishListArray)
                    SetProductList(data)
                    SetInfiniteScrollStatus(false)
                    SetInfiniteScrollNum(infinite_scroll_num + 1) 
                    }else{
                        SetSpinStatus(true)
                    }
                })//
            })
        }}
    }, // eslint-disable-next-line
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
            }   
       })
    })

    useEffect(()=>{
        if(infinite_scroll_status === true){
            if(loader === false) SetLoader(true)
            InfiniteScroll()
        }
    }, //eslint-disable-next-line 
    [infinite_scroll_status])

    const ClearScreenHandler = ()=>{
        if(contactus_popup){
            SetContactusPopup(false)
        }
        if(logout_popup){
            SetLogoutPopup(false)
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
        props.history.push('/e-commerce/cartItems')
    }

            
    const TriggerWishlist = (e, wishlist_triggered, item_id, item_name, Seller, price, img, desc)=>{
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
                email: localStorage.getItem('Email'),
                Seller,
                price,
                img,
                desc
            }
            axios.put(`/wishlist/${localStorage.getItem('auth-token')}/add`, context).then(()=>{})
        }else{
            e.target.style.color = 'grey'
            const dummy = [...wishlist]
            const index = dummy.findIndex((element)=>{return element.item_id === item_id})
            dummy.splice(index, 1)
            SetWishlist(dummy)
            localStorage.setItem('WishList', JSON.stringify(dummy))
            // further axios request
            const context = {item_id, email: localStorage.getItem('Email')}
            axios.put(`/wishlist/${localStorage.getItem('auth-token')}/remove`, context).then(()=>{})
        }
    }

    const AddToCartHandler = (product_img, product_name, product_price, id)=>{
        if(cart_items){
            const dummy = [...cart_items]
            const filtered = dummy.find((arr)=>{
                return arr.id === id
            })
            if(!filtered){
                dummy.push({product_img, product_name, product_price, id})
                SetCartItems(dummy)
                const context = {
                    Email: localStorage.getItem('Email'),
                    item_name: product_name,
                    item_id: id,
                    product_price,
                    product_img
                }
                axios.put(`/cart/${localStorage.getItem('auth-token')}/add`, context).then(()=>{})
            }
            }else{
                SetCartItems([{product_img, product_name, product_price, id}])
                const context = {
                Email: localStorage.getItem('Email'),
                item_name: product_name,
                item_id: id,
                product_price,
                product_img
                }
                axios.put(`/cart/${localStorage.getItem('auth-token')}/add`, context).then(()=>{})
        }
    }

    const RemoveFromCartHandler = (product_id)=>{
        const data = [...cart_items]
        const finder = data.find((arr)=>{
            return arr.id === product_id
        })
        if(finder){
            const index = data.findIndex(()=>finder)
            data.splice(index, 1)
            SetCartItems(data)
            const context = {
                Email: localStorage.getItem('Email'),
                item_name: product_name,
                item_id: product_id
            }
            axios.put(`/cart/${localStorage.getItem('auth-token')}/remove`, context).then(()=>{})
        }
    }

    const LogoutPopupHandler = ()=>{
        SetLogoutPopup(!logout_popup)
    }

    const LogoutConfirmHandler = ()=>{
        props.ChangeAuthentication(true)
    }

    const SellerRouteTrigger = ()=>{
        props.history.push('/e-commerce/seller-nav')
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
                    TotalItems: product_list,
                    CartItems: cart_items
                }}>
                    <MainPageContext.Provider value={{
                        SellerPageTrigger: SellerRouteTrigger,
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
                        TriggerWishList: (e, status, item_name, item_id, Seller, price, img, desc)=>TriggerWishlist(e, status, item_name, item_id, Seller, price, img, desc),
                        product_name,
                        product_desc,
                        product_img,
                        product_price,
                        AddToCartHandler: (product_img, product_name, product_price, product_id)=>AddToCartHandler(product_img, product_name, product_price, product_id),
                        RemoveFromCartHandler: (id)=>RemoveFromCartHandler(id),
                        Loader: loader,
                        LogoutPopupHandler: LogoutPopupHandler,
                        logout_popup,
                        LogoutConfirmHandler: LogoutConfirmHandler,
                        err: product_list_err
                    }}>
                        <Store type="MainPage" loader={loader}/>
                    </MainPageContext.Provider>
                </StoreContext.Provider>
                <input type='file' hidden onChange={FileEncoder} ref={InputFile}/>
            </div>: <LogoPage/>}

        </Fragment>
    )
}

export default React.memo(withRouter(Mainpage))
