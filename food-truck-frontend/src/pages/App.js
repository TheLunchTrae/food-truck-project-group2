import React, { Component } from 'react';
import foodTruck from '../util/TaquisaWaco.jpg';

class App extends Component {

    render() {
        return (
            <div>
                This is the homepage of Group 2's Frontend! :)
                <br/>
                <nav>
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
                    <br/>
                    <img src={foodTruck} style={{width:2280 + 'px', height:1621 + 'px'}}/>
                </nav>
            </div>
        );
    }
}

export default App;