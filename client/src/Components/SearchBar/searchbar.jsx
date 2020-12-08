import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
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
    const [search_result, SetSearchResult] = useState(null)
    const [filtered_results, SetFilteredResult] = useState([])
    const [search_data, SetSearchData] = useState('')

    useEffect(()=>{
        axios.get('/search-engine-data').then((response)=>{
            const data = response.data
            SetSearchResult(data)
        })
    }, [])

    const fetchSearchItem = (event)=>{
        const value = event.target.value
        SetSearchData(value)
        const main_regex = new RegExp(`^${value}`, 'gi')
        const sub_regex = new RegExp(`${value}`, 'gi')

        if(search_result){
            const dummy = [...search_result]
            const filtered_search = dummy.filter((item)=>{
                return main_regex.exec(item) !== null || sub_regex.exec(item) !== null
            })
            if(filtered_search.length >= 1){
                SetFilteredResult(filtered_search)
            }
        }

    }

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

    let search_jsx = null
    if(filtered_results.length >= 1){
        const dummy = [...filtered_results]
        search_jsx = dummy.map((element, i)=>{
            return (
                <div className='search-result' key={i}>{element}</div>
            )
        })
    }

    return (
       <Fragment>
           <div className={`search-bar-fix ${className}`} style={{filter: `blur(${props.blur})`}}>
               <div className='search-bar-rel'>
                    <input className='search-bar' type='text' placeholder='Search For Products' value={search_data} onChange={fetchSearchItem}/>
                    <SearchIcon/>
                </div>
                {(filtered_results.length >= 1)?
                <main className='search-results-container'>
                    {search_jsx}
                </main>
                :null}
           </div>
       </Fragment>
    )
}

export default SearchBar
