import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = {username: '', email: '', password: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            userName: this.state.username,
            emailAddress: this.state.email,
            password: this.state.password,
            userType: document.getElementById("usertype").value
        };

        //Post to URL
        const val = axios.post("http://localhost:8080/signup", userDto).then(res => {
            console.log(res);
            this.setState({
                username:'',
                email:'',
                password:''
            })
            window.location.href = "/login";
        });

        event.preventDefault()
        
    }

    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#FFDAB9', marginLeft: '35px'}}>
                    <div>
                        <div class="sections" >
                            <div class = "signup" style = {{alignContent: 'center', float: 'left', borderRadius: '100px', background: '#FA8072', width: '25%', padding: '20px', display: 'inline-block', marginTop: '20px', marginLeft: '670px'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '4.5rem', textAlign: 'center', fontWeight: 'bold'}}>Sign Up</span>
                                    <span class = "username" style = {{marginLeft: '27px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Username:</span>
                                        <span id = "usernameInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="username" placeholder="Enter a Username" value={this.state.username} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "email" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Email:</span>
                                        <span id = "emailInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="email" pattern=".*@.*\..*" title="Must be in valid email format" placeholder="Enter an email" value={this.state.email} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    <label>
                                        <span class = "password" style = {{marginLeft: '32px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Password:</span>
                                    </label>
                                    <span id = "passwordInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                        <input type="password" name="password" placeholder="Enter a password" value={this.state.password} onChange={this.handleInputChange}/>
                                    </span>
                                    <br></br>
                                    <label>
                                        <span class = "userType" style = {{marginLeft: '31px', display: 'inline', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>User Type:</span>
                                    </label>
                                    <span id = "type" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                        <select id="usertype">
                                            <option value="Customer">Customer</option>
                                            <option value="Owner">Food Truck Owner</option>
                                        </select>
                                    </span>
                                    <span style={{marginLeft: '200px'}}>
                                        <input type="submit" value="Sign Up!"/>
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
