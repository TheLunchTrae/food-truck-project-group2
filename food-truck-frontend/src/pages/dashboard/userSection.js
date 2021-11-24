import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

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
                    <img class={styles.buttonImage} src="https://i.imgur.com/qxQk2c1.png"/>
                </button>
                <span class={styles.choice}>
                    <div>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="American">
                            American
                            <span>

                            </span>
                        </button>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="Mexican">Mexican</button>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="Japanese">Japanese</button>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="Chinese">Chinese</button>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="Thai">Thai</button>
                        <button type="button" class={styles.typeChoice} onClick={this.chooseType} id="Indian">Indian</button>
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
                <span class={styles.choice}>
                    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={["places"]}>
                        <StandaloneSearchBox onPlacesChanged={this.onPlacesChanged}>
                            <input
                                type="text"
                                placeholder="Address"
                                style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                }}
                            />
                        </StandaloneSearchBox>
                    </LoadScript>
                </span>


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