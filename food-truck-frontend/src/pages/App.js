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
                    <a href = "\notifications">Notifications</a>
                    <br/>
                    <a href = "\dashboard">Dashboard</a>
                    <br/>
                    <a href = "\about">About</a>
                </nav>
            </div>
        );
    }
}

export default App;