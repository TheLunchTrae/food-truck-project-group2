import React, { Component } from 'react';
import axios from 'axios';

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
        alert("Email: " + this.state.email + "\nPassword: " + this.state.password);
        const userDto = {
            emailAddress: this.state.email,
            password: this.state.password,
            userType: "Customer"
        };

        const instance = axios.create({baseURL: process.env.FOOD_TRUCK_API_URL})

        instance.post('/signup', userDto).then(res => {
            console.log("User added")
            this.setState({
                email: userDto.emailAddress,
                password: userDto.password
            });
            alert("Email state: " + this.email + "\nPassword state: " + this.password);
        })

        event.preventDefault()
    }
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <meta httpEquiv="refresh"
                        content="5; url = /login" />
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
                <br/>
            </div>
        );
    }
}
export default Signup;
