import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import Login from "./Login";
import Search from "./Search"
import Notifications from "./Notifications";
import Dashboard from "./Dashboard";
import About from "./About"
import Details from "./Details"
import { Details } from '@material-ui/icons';


export default function RouterConfig() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/search" component={Search}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/about" component={About}/>
                <Route path="/details" component={Details}/>
            </Switch>
        </BrowserRouter>
    );
}
