import React, { Fragment, Suspense, useContext, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Navbar from '../NavBar/navbar';
import SearchBar from '../SearchBar/searchbar';
import SideNav from '../SideNav/side-nav';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import Signup from '../LandingPage/Signup/signup';
import Login from '../LandingPage/Signin/login';
import Contact from '../LandingPage/Contact/contact';
import Home from './Routes/HomeRoute/home';
import Cart from './Routes/CartRoute/cart';
import SoldItems from './Routes/SoldItemsRoute/sold-items';
import Wishlist from './Routes/WishlistRoute/wishlist';
import History from './Routes/HistoryRoute/history';
import MainPageContext from '../../Containers/MainPage/MainPageContext';
import Spinner from '../UI/Spinner/spinner';
import Logout from '../LandingPage/Logout/logout';

const AsyncSellerPage = React.lazy(()=>{
    return import('./Routes/SellerRoute/seller-page');
})

const Store = (props) => {
    const [window_height] = useState(window.innerHeight)
    const Context = useContext(LandingPageContext)
    const Context1 = useContext(MainPageContext)
    let Signup_jsx = null
    let Login_jsx = null
    let Contactus_jsx = null
    let Logout_jsx = null
    let blur = '0px'
    if(Context.Login_state){
        Login_jsx = <Login/>
        blur = '3px'
    }
    
    if(Context.Signup_state){
        Signup_jsx = <Signup/>
        blur = '3px'
    }

    if(Context.Contactus_state){
        Contactus_jsx = <Contact/>
        blur = '3px'
    }

    if(Context1.contactus_popup){
        Contactus_jsx = <Contact type='MainPage'/>
        blur = '3px'
    }

    if(Context1.logout_popup){
        Logout_jsx = <Logout/>
        blur = '3px'
    }

    return (
        <Fragment>
            <main>
            <article onClick={(props.type)?Context1.ClearScreenHandler:Context.ClearScreenHandler}>
                <img src={process.env.PUBLIC_URL + '/airbnb-bg.jpg'} alt='bg' className='landingpage-bg' style={{
                        width: '100%',
                        height: `${window_height}px`,
                        filter: `blur(${blur})`,
                        opacity: '0.90',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        zIndex: '-2'
                }}/>      
                <Navbar blur={blur} {...props}/>
                <SearchBar blur={blur} {...props}/>
                <SideNav blur={blur}/>
                <Switch>
                
                    <Route exact path='/e-commerce/home' render={()=><Home blur={blur} {...props}/>}/> 
                    <Route exact path='/e-commerce/wishList' render={()=><Wishlist blur={blur} {...props}/>}/>                    
                    <Route exact path='/e-commerce/cartItems' render={()=><Cart blur={blur} {...props}/>}/>                    
                    <Route exact path='/e-commerce/history' render={()=><History blur={blur} {...props}/>}/>
                    <Route exact path='/e-commerce/soldItems' render={()=><SoldItems blur={blur} {...props}/>}/>
                    {(JSON.parse(localStorage.getItem('authentication-status')) === true)?
                    <Route exact path='/e-commerce/seller-nav' render={()=>{
                        return (
                            <Suspense fallback={<Spinner/>}>
                                <AsyncSellerPage blur={blur} {...props}/>
                            </Suspense>
                        )
                    }}/>:null}
                    <Route render={()=><Home blur={blur} {...props}/>}/>
                </Switch>
                {(Context1.Loader)? <Spinner/> : null}
            </article>
            {Signup_jsx}
            {Login_jsx}
            {Contactus_jsx}
            {Logout_jsx}
            </main>
        </Fragment>
    )
}


export default withRouter(Store)
