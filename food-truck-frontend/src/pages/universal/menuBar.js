import React, { Component } from 'react';
import axios from 'axios';
import styles from './menuBar.module.scss';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 'token': null, 'username': ''}
    }

    componentDidMount() {
        this.state.token = sessionStorage.getItem('token');
        if(this.state.token != null){
            axios.interceptors.request.use(req => {
                req.headers['token']=this.state.token;
                return req;
            });
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
    }
    
    LoggedIn(){
        return (
            <>
                {/*They float right so must be in order they appear right to left on MenuBar*/}
                <a className={styles.right} href="/logout">Logout</a>
                <a className={styles.right} href="/dashboard">{this.state.username}</a>
                <a className={styles.right} href="/about">About</a>
                <a className={styles.right} href="/search">Search</a>
            </>
        );
    }
    
    NotLoggedIn(){
        return (
            <>
                {/*They float right so must be in order they appear right to left on MenuBar*/}
                <a className={styles.right} href="/about">About</a>
                <a className={styles.right} href="/search">Search</a>
                <a className={styles.right} href="/signup">Sign Up</a>
                <a className={styles.right} href="/login">Log In</a>
            </>
        );
    }

    renderType(){
        if(this.state.token === null){ return this.NotLoggedIn(); }
        return this.LoggedIn();
    }

    render(){
        return (
            <div className={styles.topDiv}>
                <div id='topNav' className={styles.topNav}>
                    <a className={styles.FTF} href = "/">Food Truck Finder</a>
                    {this.renderType()}
                </div>
            </div>
        );
    }
}
export default MenuBar