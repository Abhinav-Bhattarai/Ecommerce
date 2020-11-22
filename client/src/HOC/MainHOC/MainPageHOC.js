import React, { Component, Fragment } from 'react';

const MainPageHoc = (Wrapper)=>{
    return class extends Component{
        // can use A cleanup to remember the previous scroll position
        render(){
            return(
                <Fragment>

                </Fragment>
            )
        }
    }
}

export default MainPageHoc