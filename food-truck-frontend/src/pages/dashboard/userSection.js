import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { NotificationsPaused } from '@material-ui/icons';
import { List } from '@material-ui/core';

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const libraries=["places"];

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = {  username: '', usertype: '', address: '', distance: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.savePrefs = this.savePrefs.bind(this);
    }

    handleInputChange(event) {
        console.log(event.target);
        const name = event.target.id;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    
    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo").then(res => {
            console.log(res);
            this.setState({
                ['username']: res.data.userName,
                ['usertype']: res.data.userType
            });
        })
        //Set default preferences
        axios.get("http://localhost:8090/api/getPreferences").then(res => {
            console.log(res.data);
            //Food Types by changing CSS
            var types = res.data.foodTypes;
            document.getElementById("typeChoiceButtons").childNodes.forEach(node => {
                if(types.includes(node.value)){
                    node.classList.add(styles.selectedType);
                }
            });
            //Distance/location by setting state values

            //Rating
            if(res.data.rating == null){
                document.getElementById("noRating").classList.add(styles.selectedRating);
            } else {
                document.getElementById(res.data.rating).classList.add(styles.selectedRating);
            }
            //Price
            if(res.data.price == null){
                document.getElementById("noPrice").classList.add(styles.selectedPrice);
            } else {
                document.getElementById(res.data.price).classList.add(styles.selectedPrice);
            }
        })
    }

    pressed(event){
        const classes = event.target.classList;
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
        var choice = event.target.classList;
        if(choice.contains(styles.selectedType)){
            choice.remove(styles.selectedType);
        } else {
            choice.add(styles.selectedType);
        }
    }

    chooseRating(event){
        var doc = document.getElementsByClassName(styles.selectedRating);
        if(doc.length != 0) { doc[0].classList.remove(styles.selectedRating); }
        event.target.classList.add(styles.selectedRating);
    }

    choosePrice(event){
        var doc = document.getElementsByClassName(styles.selectedPrice);
        if(doc.length != 0) { doc[0].classList.remove(styles.selectedPrice); }
        event.target.classList.add(styles.selectedPrice);
    }

    async savePrefs(){
        //Build food type string
        const nodes = document.getElementsByClassName(styles.selectedType);
        var foodTypes = [];
        Array.from(nodes).forEach(choice => {
            foodTypes.push(choice.value);
        });
        //Build location object
        var address = this.state.address;
        var location;
        if(address != ""){
            await Geocode.fromAddress(address).then(geo => {
                location = geo.results[0].geometry.location;
            });
        } else {
            address = null;
        }
        //Range
        var range = this.state.range;
        if(range == ""){
            range = null;
        }
        //Rating
        var rating = document.getElementsByClassName(styles.selectedRating);
        if(rating[0].value == "None") { rating = null; }
        else rating = rating[0].value;
        //Price
        var price = document.getElementsByClassName(styles.selectedPrice);
        if(price[0].value == "None") { price = null; }
        else price = price[0].value;
        
        const prefs = {
            foodTypes: foodTypes,
            location: location,
            distance: range,
            rating: rating,
            price: price
        };
        console.log(prefs);
        axios.post("http://localhost:8090/api/dashboard/preferences", prefs).then(res => {
            console.log(res);
        });
    }

    render(){
        return (
            <div class={styles.userSection}>
                <h1 class={styles.username}>{this.state.username}</h1>
                <h3>{this.state.usertype}</h3>
                <hr class={styles.divider}/>
                <h2 class={styles.prefHead}>Preferences</h2>
                <button type="submit" class={styles.savePrefs} onClick={this.savePrefs}>Save Preferences</button>

                <button type="button" class={styles.prefPopout} id="typeButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                    Food Type
                    </span>
                    {/*<img class={styles.buttonImage} src="https://i.imgur.com/qxQk2c1.png"/>*/}
                </button>
                <span class={styles.choice}>
                    <div id="typeChoiceButtons">
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="American">American</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="Mexican">Mexican</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="Japanese">Japanese</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="Chinese">Chinese</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="Thai">Thai</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseType} value="Indian">Indian</button>
                    </div>
                </span>

                <button type="button" class={styles.prefPopout} id="locButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Location
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                </button>
                <span class={styles.choice}>
                    <input id="distance" type="text" placeholder="Range (in miles)" onChange={this.handleInputChange} class={styles.locTextBox} value={this.state.distance}/>
                    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={libraries}>
                        <StandaloneSearchBox>
                            <input id="address" type="text" placeholder="Address" onChange={this.handleInputChange} class={styles.locTextBox} value={this.state.address}/>
                        </StandaloneSearchBox>
                    </LoadScript>
                </span>
                
                <button type="button" class={styles.prefPopout} id="ratingButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Rating
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                </button>
                <span class={styles.choice} >
                    <div id="ratingChoiceButtons">
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="noRating" value="None">None</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="5" value="5">5 stars</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="4"value="4">4 stars</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="3"value="3">3 stars</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="2"value="2">2 stars</button>
                        <button type="button" class={styles.choiceButton} onClick={this.chooseRating} id="1"value="1">1 star</button>
                    </div>
                </span>
                
                <button type="button" class={styles.prefPopout} id="priceButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Price
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                </button>
                <span class={styles.choice} >
                    <div id="priceChoiceButtons">
                        <button type="button" class={styles.choiceButton} onClick={this.choosePrice} id="noPrice" value="None">None</button>
                        <button type="button" class={styles.choiceButton} onClick={this.choosePrice} id="15" value="15.00">$$$</button>
                        <button type="button" class={styles.choiceButton} onClick={this.choosePrice} id="10" value="10.00">$$</button>
                        <button type="button" class={styles.choiceButton} onClick={this.choosePrice} id="5"  value="5.00" >$</button>
                    </div>
                </span>
            </div>
        );
    }
}

export default UserSection;