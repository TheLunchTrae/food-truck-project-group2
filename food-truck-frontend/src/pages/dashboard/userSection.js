import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = {  username: '', usertype: '', typePref: 'None', 
                        rangePref: 'None', ratingPref: 'None', pricePref: 'None',
                        editing: false
                    };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo").then(res => {
            this.setState({
                ['username']: res.data.userName,
                ['usertype']: res.data.userType
            });
        })
    }

    handleInputChange(event) {
        console.log(event.target);
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        
    }

    render(){
        return (
            <div class={styles.userSection}>
                {this.state.username}
                {this.state.usertype}
            </div>
        );
    }
}

export default UserSection;