import axios from 'axios';
import { Component } from 'react';
import { MenuBar } from './index.js';
import loginService from './universal/loginService.js';

class Logout extends Component{

    componentDidMount(){
        loginService.logout();
        window.location.href="/";
    }
    
    render(){
        return(
            <>
            Logging Out
            </>
        );
    }
}

export default Logout;