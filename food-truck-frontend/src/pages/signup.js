import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';
import MenuBar from '../menuBar';
import styles from './signup.module.scss';

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
            userType: document.getElementById("userType").value
        };

        //Post to URL
        axios.post("http://localhost:8090/api/signup", userDto).then(res => {
            console.log(res);
            this.setState({
                username:'',
                email:'',
                password:''
            })
            window.location.href = "/login";
        }).catch(e => {
            console.log(e);
            console.log(userDto);
        });

        event.preventDefault()
        
    }

    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#a9a9a9'}}>
                    <MenuBar/>
                    <div class="sections">
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Sign Up</span>
                        <div class = "signup" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '30%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                            <form onSubmit={this.handleSubmit}>
                                <div class={styles.wrapper}>

                                    <div class={styles.formnput}>
                                        <input id="username" class={styles.formelementinput} value={this.state.username} type="input" placeholder="Please create a username"  required onChange={this.handleInputChange}/>
                                        <div class={styles.formelementbar}></div>
                                        <label class={styles.formelementlabel} for="username">Username</label>
                                    </div>

                                    <div class={styles.formnput}>
                                        <input id="emailInput" class={styles.formelementinput} type="input" pattern=".*@.*\..*" title="Must be in valid email format" placeholder="Please fill in your email"  value={this.state.email} required onChange={this.handleInputChange}/>
                                        <div class={styles.formelementbar}></div>
                                        <label class={styles.formelementlabel} for="email">Email</label>
                                    </div>

                                    <div class={styles.formnput}>
                                        <input id="passwordInput" class={styles.formelementinput} type="password" name="password" placeholder="Please enter a password" required value={this.state.password} onChange={this.handleInputChange}/>
                                        <div class={styles.formelementbar}></div>
                                        <label class={styles.formelementlabel} for="password">Password</label>
                                    </div>

                                    <div class={styles.formnput}>
                                        <select class={styles.formelementinput} name="usertype" id="userType">
                                            <option value="Customer">Customer</option>
                                            <option value="Owner">Food Truck Owner</option>
                                        </select>
                                        <div class={styles.formelementbar}></div>
                                        <label class={styles.formelementlabel} for="password">User Type</label>
                                    </div>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <button type="submit" style = {{background: '#a9a9a9', fontSize: '17px', cursor: 'pointer'}}>Subscribe</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Signup;
