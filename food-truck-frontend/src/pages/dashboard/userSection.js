import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries=["places"];

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = {  username: '', usertype: '', distance: '', address: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.savePrefs = this.savePrefs.bind(this);
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
        //Set default preferences
        
        axios.get("http://localhost:8090/api/getPreferences").then(res => {
            console.log(res.data);
            //Food Types by changing CSS
            var types = res.data.foodTypes;
            document.getElementsByName("foodType").forEach(node => {
                if(types.includes(node.value)){
                    node.checked = true;
                }
            });
            //Distance/location by setting state values

            //Rating
            var rate = document.getElementsByName("rating");
            if(res.data.rating == null){
                rate[0].checked = true;
            } else {
                rate.forEach(opt => {
                    if(res.data.rating == opt.value){
                        opt.checked = true;
                    }
                })
            }
            //Price
            var price = document.getElementsByName("price");
            if(res.data.price == null){
                price[0].checked = true;
            } else {
                price.forEach(opt => {
                    if(res.data.price == opt.value){
                        opt.checked = true;
                    }
                });
            }
        });
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

    async savePrefs(){
        //Build food type string
        var foodTypes = [];
        const nodes = document.querySelectorAll('input[name="foodType"]:checked');
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
        //Distance
        var distance = this.state.distance;
        if(distance == ""){
            distance = null;
        }
        //Rating
        var rating = document.querySelector('input[name="rating"]:checked').value;
        if(rating == "None") { rating = null; }
        //Price
        var price = document.querySelector('input[name="price"]:checked').value;
        if(price == "None") { price = null; }

        const prefs = {
            foodTypes: foodTypes,
            location: location,
            distance: distance,
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
                <h3 class={styles.usertype}>{this.state.usertype}</h3>
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
                    <label class={styles.choiceLabel}>
                        American
                        <input type="checkbox" name="foodType" class={styles.typeCheckbox} value="American"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        Mexican
                        <input type="checkbox" name="foodType" class={styles.typeCheckbox} value="Mexican"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        Indian
                        <input type="checkbox" name="foodType" class={styles.typeCheckbox} value="Indian"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        Japanese
                        <input type="checkbox" name="foodType" class={styles.typeCheckbox} value="Japanese"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        Chinese
                        <input type="checkbox" name="foodType" class={styles.typeCheckbox} value="Chinese"/>
                        <span class={styles.customBox}/>
                    </label>

                </span>

                <button type="button" class={styles.prefPopout} id="locButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Location
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                </button>
                <span class={styles.choice}>
                    <input id="distance" name="distance" type="text" placeholder="Range (in miles)" class={styles.locTextBox} onChange={this.handleInputChange} value={this.state.distance}/>
                    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={libraries}>
                        <StandaloneSearchBox>
                            <input id="address" name="address" type="text" placeholder="Address" onChange={this.handleInputChange} class={styles.locTextBox} value={this.state.address}/>
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
                    <label class={styles.choiceLabel}>
                        None
                        <input type="radio" name="rating" class={styles.typeRadio} value="None"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        5 Stars
                        <input type="radio" name="rating" class={styles.typeRadio} value="5"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        4 Stars
                        <input type="radio" name="rating" class={styles.typeRadio} value="4"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        3 Stars
                        <input type="radio" name="rating" class={styles.typeRadio} value="3"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        2 Stars
                        <input type="radio" name="rating" class={styles.typeRadio} value="2"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        1 Stars
                        <input type="radio" name="rating" class={styles.typeRadio} value="1"/>
                        <span class={styles.customBox}/>
                    </label>
                </span>
                
                <button type="button" class={styles.prefPopout} id="priceButton" onClick={this.pressed} name="prefButton">
                    <span class={styles.buttonText}>
                        Price
                    </span>
                    <span class={styles.buttonImage}>
                        
                    </span>
                </button>
                <span class={styles.choice} >
                    <label class={styles.choiceLabel}>
                        None
                        <input type="radio" name="price" class={styles.typeRadio} value="None"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        $$$
                        <input type="radio" name="price" class={styles.typeRadio} value="15"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        $$
                        <input type="radio" name="price" class={styles.typeRadio} value="10"/>
                        <span class={styles.customBox}/>
                    </label>
                    <label class={styles.choiceLabel}>
                        $
                        <input type="radio" name="price" class={styles.typeRadio} value="5"/>
                        <span class={styles.customBox}/>
                    </label>
                </span>
            </div>
        );
    }
}

export default UserSection;