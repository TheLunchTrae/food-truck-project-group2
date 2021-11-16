import React, { Component } from 'react';
import axios from 'axios';
import loginService from './loginService';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 'token': null, 'username': ''}
    }

    componentDidMount() {
        this.state.token = sessionStorage.getItem('token');
        console.log('token = ' + this.state.token);
        if(this.state.token != null){
            axios.get('http://localhost:8090/api/username', {
                headers: {
                    'token': this.state.token
                }
            }).then(res => {
                console.log(res);
                this.setState({
                    ['username']: res.data
                })
            })
        }
        this.render();
    }
    
    LoggedIn(){
        return (    
                <div name="menuBar" class="banner-area" style = {{margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '5vh'}}>
                    <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                        <div class="navigation" style = {{height: '60px'}}>
                            <nav style = {{width: '75%', float: 'right', textAlign: 'center', padding: '30px 0 0', fontSize: '1rem'}}>
                                <a href = "\\" style = {{textDecoration: 'none', marginRight: '10vw', padding: '15px 20px', fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                                    Food Truck Finder
                                </a>
                                <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>
                                    {this.state.username}
                                </a>
                                <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                                <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>
                                <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                            </nav>
                        </div>
                    </div>
                </div>
        );
    }
    
    NotLoggedIn(){
        return (
            <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '5vh'}}>
                <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                    <div class="navigation" style = {{height: '60px'}}>
                        <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                            Food Truck Finder
                        </a>
                        <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                            <a href = "\signup" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Sign Up</a>
                            <a href = "\login" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Log In</a>
                            <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                            <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>
                            <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }

    renderType(){
        if(this.state.token === null){ return this.NotLoggedIn(); }
        return this.LoggedIn();
    }

    render(){
        return (
            <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '7vh'}}>
                {this.renderType()}
            </div>
        );
    }
}
export default MenuBar