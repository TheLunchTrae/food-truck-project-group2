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
        //Object that will be passed containing the users information
        const userDto = {
            emailAddress: this.state.email,
            password: this.state.password,
            userType: "Customer"
        };

        //Creates an axios instance at the backend address
        const instance = axios.create({baseURL: process.env.FOOD_TRUCK_API_URL})
        /*Posts to the address. This format solves for an error when the backend port is
        different from the frontend*/
        instance.post('/signup', userDto).then(res => {
            console.log("User added");
            this.setState({
                email: userDto.emailAddress,
                password: userDto.password
            })
        });

        event.preventDefault()
        window.location.href = "/login";
    }

    render() {
        return (
            <div align="middle">
                <h1>Sign Up</h1>
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
