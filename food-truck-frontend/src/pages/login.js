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

        const instance = axios.create({baseURL: process.env.FOOD_TRUCK_API_URL})
        instance.post("/login", userDto).then((res) => {
            console.log(res.data);
            console.log(res.status);
            console.log(res.statusText);
        })
        
        alert("Successful Login!")

        event.preventDefault()
       // window.location.href = "/search";
    }
    render() {
        return (
            <div align="middle">
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Email:
                            <input name="email" value={this.state.email} type="text" onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <br/>
                    <div>
                        <label>
                            Password:
                            <input name="password" value={this.state.password} type="text" onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
export default Login;
