import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import axios from 'axios';

import LandingPageGuard from '../../HOC/Guards/LandingPageGuard';
import MainPageGuard from '../../HOC/Guards/MainPageGuard';
import LandingPage from '../LandingPage/LandingPage';
import Mainpage from '../MainPage/Mainpage';

class Mainroute extends Component {

    state = {
        authentication_status: false
    }

    componentDidMount(){
        const token = localStorage.getItem('auth-token')
        if(token){
            axios.get(`/check/${token}`).then((response)=>{
                const data = response.data
                if(data !== {}){
                    this.setState({
                        authentication_status: true
                    })
                    localStorage.setItem('user-info', data)
                }
            })
        }
    }

    render() {
        return (
            <Fragment>
                
                    <MainPageGuard auth={this.state.authentication_status}>
                        <Switch>
                            <Route path='/main' exact component={Mainpage}/>
                            <Route component={Mainpage}/>
                        </Switch>
                    </MainPageGuard>

                    <LandingPageGuard auth={this.state.authentication_status}>
                        <Switch>
                            <Route path='/main' exact component={LandingPage}/>
                            <Route component={LandingPage}/>
                        </Switch>
                    </LandingPageGuard>
                
            </Fragment>
        );
    }
}

export default withRouter(Mainroute);
