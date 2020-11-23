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
    
    AuthenticationChange = (authenticated)=>{
        this.setState({authentication_status: !authenticated})
    }

    render() {
        return (
            <Fragment>
                
                    <MainPageGuard auth={this.state.authentication_status}>
                        <Switch>
                            <Route path='/main' exact  render={()=><Mainpage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/>}/>
                            <Route render={()=><Mainpage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/>}/>
                        </Switch>
                    </MainPageGuard>

                    <LandingPageGuard auth={this.state.authentication_status}>
                        <Switch>
                            <Route path='/main' exact render={()=><LandingPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/>}/>
                            <Route render={()=><LandingPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/>}/>
                        </Switch>
                    </LandingPageGuard>
                
            </Fragment>
        );
    }
}

export default withRouter(Mainroute);
