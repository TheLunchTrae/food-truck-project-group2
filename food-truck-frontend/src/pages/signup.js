import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = {email: '', password: ''};
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
            emailAddress: this.state.email,
            password: this.state.password,
            userType: "Customer"
        };

        //Creates an axios instance at the backend address
        const instance = axios.create({baseURL: "http://localhost:8080"});

        //Posts user information to backend
        instance.post("/signup", userDto);
    

        alert("Successful Login Creation!")

        event.preventDefault()
        //window.location.href = "/login";
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
                                        <span class = "email" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Email:</span>
                                        <span id = "emailInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="email" value={this.state.email} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    <label>
                                        <span class = "password" style = {{marginLeft: '31px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Password:</span>
                                    </label>
                                    <span id = "passwordInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                        <input name="password" value={this.state.password} type="text" onChange={this.handleInputChange}/>
                                    </span>
                                    <br></br>
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
