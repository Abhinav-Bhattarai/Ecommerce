import React, { Fragment } from 'react';
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
    return (
       <Fragment>
           <div className='search-bar-fix' style={{filter: `blur(${props.blur})`}}>
               <div className='search-bar-rel'>
                    <input className='search-bar' type='text' placeholder='Search For Products'/>
                    <SearchIcon/>
                </div>
           </div>
       </Fragment>
    )
}

export default SearchBar
