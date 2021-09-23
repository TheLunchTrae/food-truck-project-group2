import React from 'react';
import Link from '@material-ui/core/Link';
require('dotenv').config();
import Route from "./Route";

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
            <a href = "\notificaiton">Notifications</a>
            <br/>
            <a href = "\dashboard">Dashboard</a>
            <br/>
            <a href = "\about">About</a>
        </div>
    )
}
export default HomePage