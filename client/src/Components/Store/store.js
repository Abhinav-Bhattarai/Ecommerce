import React, { Fragment, useContext, useState } from 'react';
import './store.css';
import BG from '../../assets/airbnb-bg.jpg';
import Navbar from '../../Components/NavBar/navbar';
import SearchBar from '../../Components/SearchBar/searchbar';
import SideNav from '../../Components/SideNav/side-nav';
import LandingPageContext from '../../Containers/LandingPage/LandingPageContext';
import Signup from '../LandingPage/Signup/signup';

const Store = () => {
    const [window_height] = useState(window.innerHeight)
    const Context = useContext(LandingPageContext)
    let Signup_jsx = null
    if(Context.Login_state){
        console.log(true)
    }
    if(Context.Signup_state){
        Signup_jsx = <Signup/>
    }
    return (
        <Fragment>
            <article>
            <img src={BG} alt='bg' className='landingpage-bg' style={{
                    width: '100%',
                    height: `${window_height}px`,
                    opacity: '0.90',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '-2'
            }}/>            
            <Navbar/>
            <SearchBar/>
            <SideNav/>
            {Signup_jsx}
            <main className='landing-page-container' style={{height: `${window_height}px`}}>

            </main>
            </article>
        </Fragment>
    )
}

export default Store
