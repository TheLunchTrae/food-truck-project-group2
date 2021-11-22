import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = {  username: '', usertype: '', typePref: '', 
                        rangePref: '', ratingPref: '', pricePref: '',
                        editing: false
                    };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        console.log(event.target);
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    
    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo").then(res => {
            this.setState({
                ['username']: res.data.userName,
                ['usertype']: res.data.userType
            });
        })
    }

    pressed(event){
        const caller = document.getElementById(event.target.id);
        const classes = caller.classList;
        if(classes.contains(styles.open)){
            classes.remove(styles.open);
            console.log("Closed " + event.target.id);
        } else {
            const others = document.getElementsByName("prefButton");
            others.forEach(ele => {
                if(ele.classList.contains(styles.open)){
                    ele.classList.remove(styles.open);
                }
            })
            classes.add(styles.open);
            console.log("Opened " + event.target.id);
        }
        
    }

    chooseType(event){
        
    }

    render(){
        return (
            <div class={styles.userSection}>
                <h1 class={styles.username}>{this.state.username}</h1>
                <h3 class={styles.usertype}>{this.state.usertype}</h3>
                <hr class={styles.divider}/>
                <h2 class={styles.prefHead}>Preferences</h2>
                <button type="submit" class={styles.savePrefs}>Save Preferences</button>

                <button type="button" class={styles.prefPopout} id="typeButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                    Food Type
                    </span>
                    <span class={styles.buttonImage}>

                    </span>
                </button>
                <span class={styles.choice}>
                    <div>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="American">American</button>

                    </div>
                </span>

                <button type="button" class={styles.prefPopout} id="locButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Location
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                    <span class={styles.choice} >
                        
                    </span>
                </button>
                    
                <button type="button" class={styles.prefPopout} id="ratingButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Rating
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                    <span class={styles.choice} >
                        
                    </span>
                </button>
                
                <button type="button" class={styles.prefPopout} id="priceButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Price
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                    <span class={styles.choice} >
                        
                    </span>
                </button>
            </div>
        );
    }
}

export default UserSection;