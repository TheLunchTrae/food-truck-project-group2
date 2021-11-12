import React, { Component } from 'react';
import axios from 'axios';
import LoginService from '../documents/LoginService';

class Login extends Component {
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
        LoginService.doLogin(this.state.email, this.state.password)
        .then(res => {
            console.log(res);
            LoginService.setToken(res.headers['token']);
            window.Location.href="/dashboard";
        }).catch(e => {
            console.log(e);
        });
        
        event.preventDefault()
       // window.location.href = "/search";
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB', marginLeft: '35px'}}>
                    <div>
                        <div class="sections" >
                            <div class = "login" style = {{alignContent: 'center', float: 'left', borderRadius: '100px', background: '#none', width: '30%', padding: '20px', display: 'inline-block', marginTop: '20px', marginLeft: '500px'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span className="heading" style={{color: "#0F52BA", display: 'block', fontSize: '4.5rem', textAlign: 'center', fontWeight: 'bold'}}>Login</span>
                                        <span id = "email" style = {{color: '#ffffff', marginLeft: '80px', display: 'inline', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>Email:</span>
                                        <span id = "emailInput" style={{fontSize: '1.5rem', display: 'inline', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="email" pattern=".*@.*\..*" title="Must be in valid email format" placeholder="Enter an Email" value={this.state.email} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <br/>
                                    <label>
                                        <span class = "password" style = {{color: '#ffffff', marginLeft: '31px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Password:</span>
                                    </label>
                                    <span id = "passwordInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                    <input type="password" name="password" placeholder="Enter a password" value={this.state.password} onChange={this.handleInputChange}/>
                                    </span>
                                    <br></br>
                                    <span style={{marginLeft: '200px'}}>
                                        <input type="submit" value="Login"/>
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
export default Login;
