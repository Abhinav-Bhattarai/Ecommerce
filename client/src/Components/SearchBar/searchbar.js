import React, { Fragment, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import './searchbar.css';

const SearchIcon = ()=>{
    return (
        <IconContext.Provider value={{className: 'Search-icon'}}>
            <FaSearch/>
        </IconContext.Provider>
    )
}

const SearchBar = (props) => {
    const [scrollY_pos, SetScrollPos] = useState(false)
    window.addEventListener('scroll', ()=>{
        if(scrollY_pos === false){
        if(window.scrollY > 10){
            SetScrollPos(true)
        }}

        if(scrollY_pos){
            if(window.scrollY <= 0){
                SetScrollPos(false)
            }
        }
    })
    let className = ''
    if(scrollY_pos){
        className = 'scroll-hide' 
    }
    return (
       <Fragment>
           <div className={`search-bar-fix ${className}`} style={{filter: `blur(${props.blur})`}}>
               <div className='search-bar-rel'>
                    <input className='search-bar' type='text' placeholder='Search For Products'/>
                    <SearchIcon/>
                </div>
           </div>
       </Fragment>
    )
}

export default SearchBar
