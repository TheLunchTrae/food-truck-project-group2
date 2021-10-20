
//import React from 'react';
//import Link from '@material-ui/core/Link';
require('dotenv').config();

#import {BrowserRouter, Switch, Route, Router} from "react-router-dom";
#import Signup from "./Signup";
#import Login from "./Login";
#import Search from "./Search"
#import Notifications from "./Notifications";
#import Dashboard from "./Dashboard";
#import About from "./About"

require('dotenv').config();

function HomePage() {
    return (
        <div>
            This is the homepage to Group-2s Fronted! :)
            <br/>
            <a href = "\signup">Sign Up</a>
            <br/>
            <a href = "\login">Log In</a>
            <br/>
            <a href = "\search">Search</a>
            <br/>
            <a href = "\notifications">Notifications</a>
            <br/>
            <a href = "\dashboard">Dashboard</a>
            <br/>
            <a href = "\about">About</a>
        </div>
    )
}

export default HomePage

/*
import React, { Component } from 'react';
//import MyDocument from "./_document"
import ReactDOM from 'react-dom';
import RouterConfig from "./Route";

ReactDOM.render(
    <div>
        <a href = "/">Home</a>
        <RouterConfig/>
    </div>,
    document.getElementById('root')
);
*/
