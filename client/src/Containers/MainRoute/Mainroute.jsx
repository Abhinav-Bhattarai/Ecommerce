import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import axios from 'axios';

import LandingPageGuard from '../../HOC/Guards/LandingPageGuard';
import MainPageGuard from '../../HOC/Guards/MainPageGuard';
import LogoPage from '../../Components/UI/Logo Page/logo-page';

const AsyncMainPage = React.lazy(()=>{
    return import('../MainPage/Mainpage')
})

const AsyncLandingPage = React.lazy(()=>{
    return import('../LandingPage/LandingPage')
})

class Mainroute extends Component {

    state = {
        authentication_status: false
    }

    componentDidMount(){
        const authenticated = JSON.parse(localStorage.getItem('authentication-status'))
        if(authenticated === true || authenticated === undefined){
            const token = localStorage.getItem('auth-token')
            if(token){
                axios.post(`/check/`, {token}).then((response)=>{
                    const data = response.data
                    if(JSON.stringify(data) !== JSON.stringify({})){
                        this.setState({
                            authentication_status: true
                        })
                    }else{
                        localStorage.clear()
                        localStorage.setItem('authentication-status', false)
                        this.setState({
                            authentication_status: false
                        })
                    }
                })
            }
        }
    }
    
    AuthenticationChange = (authenticated)=>{
        if(authenticated){
            localStorage.clear()
        }
       localStorage.setItem('authentication-status',  JSON.stringify(!authenticated))
        this.setState({authentication_status: !authenticated})
    }

    render() {
        return (
            <Fragment>
                
                    <MainPageGuard auth={this.state.authentication_status}>
                        <Switch>
                            <Route path='/main' exact render={()=><Suspense fallback={<LogoPage/>}><AsyncMainPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/></Suspense>
                            }/>
                            
                            <Route render={()=><Suspense fallback={<LogoPage/>}><AsyncMainPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/></Suspense>
                            }/>
                        </Switch>
                    </MainPageGuard>

                    <LandingPageGuard auth={this.state.authentication_status}>
                        <Switch>

                            <Route path='/main' exact render={()=><Suspense fallback={<LogoPage/>}><AsyncLandingPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/></Suspense>}/>

                            <Route render={()=><Suspense fallback={<LogoPage/>}><AsyncLandingPage ChangeAuthentication={(status)=>this.AuthenticationChange(status)}/></Suspense>}/>

                        </Switch>
                    </LandingPageGuard>
                
            </Fragment>
        );
    }
}

export default withRouter(Mainroute);
