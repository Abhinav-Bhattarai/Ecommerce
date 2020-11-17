import React, { Fragment } from 'react';
import './side-nav.css';
import { IconContext } from 'react-icons';
import { FaHome } from 'react-icons/fa';

const Icon = ()=>{
    return (
        <IconContext.Provider value={{className: 'sidebar-icon'}}>
            <FaHome/>
        </IconContext.Provider>
    )
}

const SideNav = () => {
    return (
       <Fragment>
           <div className='side-nav-container'>
                <div className='side-nav-icon-container'>
                    <Icon/>
                </div>
           </div>
       </Fragment>
    )
}

export default SideNav
