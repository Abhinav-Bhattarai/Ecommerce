import React, { Component, Fragment } from 'react';

class Error extends Component {

    state = {
        err: false
    }

    componentDidCatch(){
        if(this.state.err === false){
            this.setState({
                err: true
            })
        }
    }
    render() {
        let jsx = this.props.children
        if(this.state.err){
            jsx = null
        }
        return (
            <Fragment>
                {jsx}
            </Fragment>
        );
    }
}

export default Error;
