import React, { Fragment, useContext, useState } from 'react';
import './store.css';
import BG from '../../assets/airbnb-bg.jpg';
import Navbar from '../../Components/NavBar/navbar';
import SearchBar from '../../Components/SearchBar/searchbar';
import SideNav from '../../Components/SideNav/side-nav';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import Signup from '../LandingPage/Signup/signup';
import Login from '../LandingPage/Signin/login';

const Store = () => {
    const [window_height] = useState(window.innerHeight)
    const Context = useContext(LandingPageContext)
    let Signup_jsx = null
    let Login_jsx = null
    let blur = '0px'
    if(Context.Login_state){
        Login_jsx = <Login/>
        blur = '3px'
    }
    
    if(Context.Signup_state){
        Signup_jsx = <Signup/>
        blur = '3px'
    }
    return (
        <Fragment>
            <main>
            <article onClick={Context.ClearScreenHandler}>
                <img src={BG} alt='bg' className='landingpage-bg' style={{
                        width: '100%',
                        height: `${window_height}px`,
                        filter: `blur(${blur})`,
                        opacity: '0.90',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        zIndex: '-2'
                }}/>            
                <Navbar blur={blur}/>
                <SearchBar blur={blur}/>
                <SideNav blur={blur}/>
                <main className='landing-page-container' style={{height: `${window_height}px`}}>

                </main>
            </article>
            {Signup_jsx}
            {Login_jsx}
            </main>
        </Fragment>
    )
}

export default Store
