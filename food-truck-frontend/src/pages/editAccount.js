import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { username: '', password: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        //Object that will be passed containing the users information
        const userDto = {
            username: this.state.username,
            password: this.state.password
        };

        //Post to URL
        const val = axios.post("http://localhost:8090/api/dashboard/modify", userDto, { 
            headers: { 
                'token': sessionStorage.getItem['token']
            }}).then(res => {
            console.log(res);
        });

        event.preventDefault()
    }
    
    componentDidMount() {
        // get the truck id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        console.log(id);

        // get the truck information from the database
        const val = axios.get("http://localhost:8090/api/details/" + id).then(res => {
            console.log(res);
            this.setState({
                username: res.data
            });
        }).catch(e => {
            console.log(e);
        });

        console.log(val);
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
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

                        <div class="sections">
                            <div class = "editAccount" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Edit Your Account</span>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "username" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Username:</span>
                                        <span id = "usernameInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="username" placeholder="Enter Your Username" value={this.state.username} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "password" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Password:</span>
                                        <span id = "passwordInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="password" placeholder="Enter A New Password" value={this.state.password} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>
                                    
                                    <br></br>

                                    <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <input type="submit" value="Submit"/>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Signup;