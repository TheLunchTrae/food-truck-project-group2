import React, { Component } from 'react';
import './_app.js'
import axios from 'axios';
import { FormatAlignLeftRounded } from '@material-ui/icons';
import { MenuBar, DefaultMap } from './index.js';
//import { Checkbox } from './Checkbox';
//import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: '', name: '', foodTruckData: [] , foodTrucksNearby: [], foodTypePref: '', address: '', range: '', ratingPref: 5, pricePref: 0.00};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handlePreferenceSubmit = this.handlePreferenceSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount(){
        this.selectedCheckboxes = new Set();
    }

    handleChangeStatus(event) {
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }

    handlePreferenceSubmit(event) {
        event.preventDefault();        

        //Post food type preferences
        beef = document.getElementById('beef');
        chicken = document.getElementById('chicken');
        turkey = document.getElementById('turkey');

        //Should be string array
        var foodPreferences = [];
        if (beef.checked == true){
            foodPreferences.push('beef');
        }
        if (chicken.checked == true){
            foodPreferences.push('chicken');
        }
        if (turkey.checked == true){
            foodPreferences.push('turkey');
        }

        var lati, lngi;
        //TODO - add error check for invalid address
        //TODO - not finding mapcomponent for some reason
        if (this.state.address.length > 0){
            MapComponent.Geocode.fromAddress(this.state.address).then(res => {
                const { lat, lng } = res.results[0].geometry.location;
                console.log(lat, lng);
                lati = lat;
                lngi = lng;
                
                const Preferences = {
                    //foodType: this.state.foodTypePref,
                    foodTypes: foodPreferences,
                    location: {
                        longitude: lngi,
                        latitude: lati
                    },
                    rating: this.state.ratingPref,
                    price:  this.state.pricePref,
                    distance: this.state.range
                };
            
                //Post to URL
                const val = axios.post("http://localhost:8090/api/dashboard/preferences", Preferences, {headers:{'userId': this.state.userId}}).then(res => {
                    console.log(res);
                });
            })
        } else {
            //No address provided
            const Preferences = {
                //foodType: this.state.foodTypePref,
                foodTypes: foodPreferences,
                rating: this.state.ratingPref,
                price:  this.state.pricePref,
                distance: this.state.range
            };
            //Post to URL
            const val = axios.post("http://localhost:8090/api/dashboard/preferences", Preferences, {headers:{'userId': this.state.userId}}).then(res => {
                console.log(res);
            });
        }
    }


    componentDidMount() {
        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        this.setState({userId: id});
        var ownerName;
        //TODO - have restriction so it doesn't get food trucks if user is not owner (i.e. via looking at user type)
        if(id != null) {
            //First get user's name from details
            axios.get("http://localhost:8090/api/details/" + id).then(res => {
                console.log(res);
                //this.setState({ name: res.data });
                ownerName = res.data;
            });
            //Get user's preferences to set as the default values for the preference settings
            axios.get("http://localhost:8090/api/getPreferences/" + id).then(res => {
                console.log(res);
                //TODO - add food type preferences among these
                this.setState({range: res.data.distance, ratingPref: res.data.rating, pricePref: res.data.price});
            });


            //Then get food truck data via dashbord data
            axios.get("http://localhost:8090/api/dashboard/" + id).then(res => {
                console.log(res);

                var ftdata = res.data.foodTrucks;

                this.setState({userId: id, name: ownerName, foodTruckData: ftdata});
            });
            //Get nearest trucks (TODO - format)
            axios.post("http://localhost:8090/api/map/nearestTrucks", {}, {headers:{'userId': id}}).then(res => {
                console.log(res);
                this.setState({foodTrucksNearby: res.data});
            });
            
        }
        else {
            this.setState({name: "USER_NAME", foodTruckData: []});
        }
    }
    myURL(id){
        return "/editTruck?id="+id
    }

    render() {
        return (
        <html>
            <body style = {{backgroundColor: '#90AACB', marginLeft: '35px'}}>
                <MenuBar/>
                <br></br>
                <div style={{fontWeight: '500'}}>
                    <h1 class = "heading" style = {{marginBottom: '0px', fontSize: '2.3rem', color: '#000000'}}>Dashboard</h1>
                    <p style = {{marginTop: '0px', fontSize: '1.3rem', color: '#FFFFFF'}}>Welcome to the Food Truck Finder Dashboard!</p>
                </div>

                <div class = "sections">
                    <div class = "userSection" style = {{float: 'left', borderRadius: '100px', background: '#F9D5A7', width: '25%', padding: '20px', display: 'inline-block', border: '3px solid black'}}>
                        <div>
                            <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                            <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>{ this.state.name }</span>
                            <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>Food Truck Owner</span>  {/*THIS IS GOING TO BE THE TYPE OF USER THEY ARE LOGGED IN AS -->*/}
                            <hr style = {{border: '1px solid black', width: '75%'}}></hr>
                            <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Notifications</u></span>
                            <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification1</span>
                            <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification2</span>
                            <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification3</span>

                            <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Preference Modification</u></span>
                            
                            <form id= "modify" onSubmit={this.handlePreferenceSubmit}>                                
                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "foodTypePref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Food Type:</span>
                                    <span id = "foodTypeInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input type="checkbox" id="beef" name="foodTypeBeef" onChange={this.handleInputChange}/>Beef
                                        <input type="checkbox" id="chicken" name="foodTypeChicken" onChange={this.handleInputChange}/>Chicken
                                        <input type="checkbox" id="turkey" name="foodTypeTurkey" onChange={this.handleInputChange}/>Turkey
                                    </span>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "locationPref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Location:</span>
                                        <span id = "locationInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="address" placeholder="Please Enter An Address" value={this.state.address} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                </div>
                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "rangePref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Range:</span>
                                        <span id = "rangeInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="range" placeholder="Please enter a Range" pattern="[0-9]+" title="Must be a positive integer value" value={this.state.range} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                </div>
                                <div style = {{ display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <label>
                                            <span class = "ratingPref" style = {{marginLeft: '17%', float: 'left', color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Rating:</span>
                                        </label>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "value" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>Rating value:</span>
                                            <span id = "ratingPref" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="ratingPref" placeholder="Enter rating value (1-5)" pattern= "[1-5]" title="Must be 1-5" value={this.state.ratingPref} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>
                                </div>

                                <div style = {{display: 'inline-block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "pricePref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Price:</span>
                                    <span id = "priceInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input name="pricePref" value={this.state.pricePref} type="text" onChange={this.handleInputChange}/>
                                    </span>
                                </div>

                                <br></br>

                                <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <input type="submit" value="Submit"/>
                                </span>
                            </form>


                        </div>
                    </div>

                    <div class = "tableSection" style = {{marginLeft: '55px', float: 'left', borderRadius: '100px', background: '#F9D5A7', width: '65%', padding: '15px', display: 'inline-block', border: '3px solid black'}}>

                        <span class = "userName" style = {{color: '#000000', display: 'block', fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}><u>Your Trucks</u></span>

                        <table class = "foodTrucks" style = {{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                            <thead style = {{color: '#0F52BA', fontSize: '1.5rem'}}>
                                <tr>
                                    <th style = {{height: '50px', width: '200px'}}>
                                        FOOD TRUCK
                                    </th>
                                    <th style = {{height: '50px', width: '200px'}}>
                                        TRUCK ID
                                    </th>
                                    <th style = {{height: '50px', width: '200px'}}>
                                        RATING
                                    </th>
                                </tr>
                            </thead>
                            <tbody style = {{color: '#FFFFFF', fontSize: '1.2rem'}}>
                                {this.state.foodTruckData.map(ft => (
                                    <tr>
                                        <td>
                                            <a href = {this.myURL(ft["truckId"])}>{ft["truckName"]}</a>                                                
                                        </td>
                                        <td>{ft["truckId"]}</td>
                                        <td>PLACEHOLDER_RATING</td>                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    trucks nearby
                    <div>{this.state.foodTrucksNearby.map(ft => (
                        ft["truckName"]
                    ))}</div>
                </div>
            </body>
        </html>
        );
    }
}
export default Dashboard;
