import React, { Component } from 'react';
import axios from 'axios';
import styles from './menuBar.module.scss';
import loginService from './loginService';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 'token': null, 'username': ''}
    }

    componentDidMount() {
        this.state.token = sessionStorage.getItem('token');
        console.log('token = ' + this.state.token);
        if(this.state.token != null){
            axios.get('http://localhost:8090/api/userinfo', {
                headers: {
                    'token': this.state.token
                }
            }).then(res => {
                console.log(res);
                this.setState({
                    ['username']: res.data.userName
                })
            })
        }
        this.render();
    }
    
    LoggedIn(){
        return (
            <>
                <a class={styles.right} href="/dashboard">{this.state.username}</a>
                <a class={styles.right} href="/search">Search</a>
                <a class={styles.right} href="/about">About</a>
            </>
        );
    }
    
    NotLoggedIn(){
        return (
            <div>
                <a class={styles.right} href="/about">About</a>
                <a class={styles.right} href="/search">Search</a>
                <a class={styles.right} href="/login">Log In</a>
                <a class={styles.right} href="/signup">Sign Up</a>
            </div>
        );
    }

    renderType(){
        if(this.state.token === null){ return this.NotLoggedIn(); }
        return this.LoggedIn();
    }

    render(){
        return (
            <div class={styles.topDiv}>
                <div id='topNav' class={styles.topNav}>
                    <a class={styles.FTF} href = "/">Food Truck Finder</a>
                    {this.renderType()}
                </div>
            </div>
        );
    }
}
export default MenuBar