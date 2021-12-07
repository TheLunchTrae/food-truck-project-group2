import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';
import styles from './signup.module.scss';

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
            userName: this.state.username,
            password: this.state.password
        };

        //Post to URL
        axios.post("http://localhost:8090/api/dashboard/modify", userDto, { 
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
            <body style = {{backgroundColor: '#708090'}}>
                <MenuBar/>
                <div class="sections">
                    <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Edit Your Account</span>
                    <div class = "editAccount" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                        <form onSubmit={this.handleSubmit}>


                            <div class={styles.formnput}>
                                <input id="usernameInput" name="username" class={styles.formelementinput} value={this.state.username} type="input" placeholder="Enter Your Username"  required onChange={this.handleInputChange}/>
                                <div class={styles.formelementbar}></div>
                                <label class={styles.formelementlabel} for="username">Username</label>
                            </div>

                            <div class={styles.formnput}>
                                <input id="passwordInput" name="password" class={styles.formelementinput} value={this.state.password} type="text" placeholder="Enter A New Password"  required onChange={this.handleInputChange}/>
                                <div class={styles.formelementbar}></div>
                                <label class={styles.formelementlabel} for="password">New Password</label>
                            </div>

                            <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        );
    }
}
export default Signup;
