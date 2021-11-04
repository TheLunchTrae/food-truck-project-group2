import React, { Component } from 'react';

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
                    <a href = "\dashboard">Dashboard (Food Truck Owner)</a>
                    <br/>
                    <a href = "\details">Dashboard (Customer)</a>
                    <br/>
                    <a href = "\about">About</a>
                    <br/>
                    <a href = "\createTruck">Create Truck</a>
                    <br/>
                    <a href = "\editTruck">Edit Truck</a>
                    <img src={foodTruck} style={{width:2280 + 'px', height:1621 + 'px'}}/>
                </nav>
            </div>
        );
    }
}

export default App;