import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Search from "./Search"
import Notifications from "./Notifications";
import Dashboard from "./Dashboard";
import About from "./About"


export default function RouterConfig() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/search" component={Search}/>
                <Route path="/notificaiton" component={Notification}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/about" component={About}/>
            </Switch>
        </BrowserRouter>
    );
}
