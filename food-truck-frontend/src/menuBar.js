import React, { Component } from 'react';
import axios from 'axios';
import loginService from './loginService';

function MenuBar(props) {
    const token = props.token;
    if(token !== null){
        return <LoggedIn />; 
    }
    return <NotLoggedIn />;
}

function GetUser(token) {
    axios.get('http://localhost:8090/api/username', {
        headers: {
            'token': sessionStorage.getItem('token')
        }
    }).then(res => {
        return res.data;
    })
}

function LoggedIn(props){
    return (
            <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '8vh'}}>
                <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                    <div class="navigation" style = {{height: '60px'}}>
                        <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                            Food Truck Finder
                        </a>
                        <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                            <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>
                                {GetUser(props.token)}
                            </a>
                            <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                            <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>                                <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                        </nav>
                    </div>
                </div>
            </div>
    );
}

function NotLoggedIn(props){
    return (
        <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '8vh'}}>
            <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                <div class="navigation" style = {{height: '60px'}}>
                    <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                        Food Truck Finder
                    </a>
                    <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                        <a href = "\signup" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Sign Up</a>
                        <a href = "\login" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Log In</a>
                        <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                        <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>                                <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default MenuBar