import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';
import loginService from './universal/loginService.js';
import styles from './signup.module.scss';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {email: '', password: ''};
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
        loginService.doLogin(this.state.email, this.state.password)
        .then(res => {
            console.log(res);
            if(res.headers['token'] !== null){
                loginService.setToken(res.headers['token']);
                window.location.href="/dashboard";
            }
        }).catch(e => {
            console.log(e);
        });
        
        event.preventDefault()
       // window.location.href = "/search";
    }

    componentDidMount(){
        if(loginService.isUserLoggedIn()) { window.location.href="/dashboard"; }
    }

    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#708090'}}>
                    <MenuBar/>
                    <div class="sections">
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Login</span>
                        <div class = "login" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                            <form onSubmit={this.handleSubmit}>

                                <div class={styles.formnput}>
                                    <input id="emailInput" name="email" class={styles.formelementinput} type="text" pattern=".*@.*\..*" title="Must be in valid email format" placeholder="Please enter your email" value={this.state.email} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="email">Email</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="passwordInput" name="password" class={styles.formelementinput} type="password" placeholder="Please enter your password" required value={this.state.password} onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="password">Password</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Login;
