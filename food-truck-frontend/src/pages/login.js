import React, { Component } from 'react';
import axios from 'axios';

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
        const userDto = {
            emailAddress: this.state.email,
            password: this.state.password,
        };

        const instance = axios.create({
            baseURL: process.env.FOOD_TRUCK_API_URL,
        })


        instance.get("/login").then((res) => {
            console.log(res.data);
        })
        
        alert("Successful Login!")

        event.preventDefault()
       // window.location.href = "/search";
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#FFDAB9', marginLeft: '35px'}}>
                    <div>
                        <div class="sections" >
                            <div class = "login" style = {{alignContent: 'center', float: 'left', borderRadius: '100px', background: '#FA8072', width: '25%', padding: '20px', display: 'inline-block', marginTop: '20px', marginLeft: '670px'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '4.5rem', textAlign: 'center', fontWeight: 'bold'}}>Login</span>
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
