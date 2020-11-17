import React, { Fragment, useState } from 'react';
import BG from '../../assets/airbnb-bg.jpg';
import Navbar from '../../Components/NavBar/navbar';
import SearchBar from '../../Components/SearchBar/searchbar';
import SideNav from '../../Components/SideNav/side-nav';

const LandingPage = () => {

    const [window_height] = useState(window.innerHeight)

    return (
        <Fragment>
            <article>
            <img src={BG} alt='bg' className='landingpage-bg' style={{
                    width: '100%',
                    height: `${window_height}px`,
                    opacity: '0.88',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '-2'
            }}/>            
            <Navbar/>
            <SearchBar/>
            <SideNav/>
            <main className='landing-page-container' style={{height: `${window_height}px`}}>

            </main>
            </article>
        </Fragment>
    )
}

export default LandingPage
