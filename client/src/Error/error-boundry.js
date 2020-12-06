import React, { Component, Fragment } from 'react';

// For production incase of crash or error
class ErrorBoundry extends Component{
    state = {
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        let jsx = this.props.children
        if(this.state.error){
            jsx = null
        }    
        return(
            <Fragment>
                {jsx}
            </Fragment>
        )
    }
}

export default ErrorBoundry