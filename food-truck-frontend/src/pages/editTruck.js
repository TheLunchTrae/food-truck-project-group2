import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';
import styles from './signup.module.scss';
import styles2 from './editTruck.module.scss';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const libraries = ['places'];

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { ownerId: -1, truckId: -1, truckName: '', route: [], locations: [], schedule: '', newMenuItemType: '', newMenuItemName: '', newMenuItemPrice: 0.0, description: '', newRating: 0.0, menu: [] };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);
        this.handleRouteSubmit = this.handleRouteSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderRoutes = this.renderRoutes.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }

    //Exclusively for modifying description, schedule, name
    handleSubmit(event) {
        if (this.state.ownerId == sessionStorage.getItem('token')) {
            const truckDto = {
                description: this.state.description,
                schedule: this.state.schedule,
                truckName: this.state.truckName,
                truckId: this.state.truckId
            };

            //Post to URL
            axios.post("http://localhost:8090/api/modifyTruck", truckDto).then(res => {
                console.log(res);
            });

            var newRoute = []
            for(let i = 0; i < this.state.route.length; ++i){
                newRoute.push({ latitude: this.state.route[i].lat, longitude: this.state.route[i].lng });
            }

            var post = axios.post("http://localhost:8090/api/modifyTruck/route", newRoute, { headers: {
                'truckId': this.state.truckId
            }}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            console.log(post);
            alert("Changes saved");
        }
        else {
            alert("You are not the owner of this truck");
        }

        event.preventDefault()
    }
    //For adding new item
    handleMenuItemSubmit(event){
        const itemDto = {
            foodType: this.state.newMenuItemType,
            foodItemName: this.state.newMenuItemName,
            foodItemPrice: this.state.newMenuItemPrice
        }

        event.preventDefault()
    }

    //For new location to add to route
    handleRouteSubmit(){
        Geocode.fromAddress(document.getElementById('routeInput').value).then(res => {
            var loc = res.results[0].geometry.location
            axios.post("http://localhost:8090/api/modifyTruck/route", {
                latitude: loc.lat,
                longitude: loc.lng
            }, {
                headers:{
                    'truckId': this.state.truckId
                }
            }).then(resp => {
                console.log(resp);
            })
            var newRoute = this.state.route;
            newRoute.push(loc);

            var newLocations = []
            for(let i = 0; i < newRoute.length; ++i){
                Geocode.fromLatLng(newRoute[i].lat, newRoute[i].lng).then(resp => {
                    newLocations.push(resp.results[0].formatted_address);
                    this.setState({
                        locations: newLocations
                    });
                });
            }
            this.setState({
                route: newRoute,
            });
            console.log(this.state.route, this.state.locations);
        }).catch(err => {
            console.log(err);
        });
        document.getElementById('routeInput').value = '';
    }

    removeLocation(event){
        var newRoute = this.state.route;
        var newLocations = this.state.locations;
        var index = event.target.value;
        newRoute.splice(index, 1);
        newLocations.splice(index, 1);
        axios.get("http://localhost:8090/api/modifyTruck/route/remove/" + index, {
            headers: {
                'truckId': this.state.truckId
            }
        }).then(res => {
            console.log(res);
        })
        this.setState({
            route: newRoute,
            locations: newLocations
        });
    }

    renderRoutes(loc, index){
        return (
            <tr key={index}>
                <td>{loc}</td>
                <td>
                    <button value={index} class={styles2.deleteButton} onClick={this.removeLocation}>Remove Location</button>
                </td>
            </tr>
        )
    }

    removeMenuItem(event){

    }

    renderMenuItem(item, index){

    }

    
    componentDidMount() {
        // get the truck id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        this.state.truckId = id;
        console.log(this.state.truckId);

        // get the truck information from the database
        axios.get("http://localhost:8090/api/getTruck/" + this.state.truckId).then(res => {
            console.log(res);
            this.setState({
                ownerId: res.data.ownerId,
                truckName: res.data.truckName,
                route: res.data.route,
                schedule: res.data.schedule,
                menu: res.data.menu,
                description: res.data.description,
                details: res.data.details,
            });
            var locations = [];
            for(let i = 0; i < this.state.route; ++i){
                Geocode.fromLatLng(this.state.route[i].lat, this.state.route[i].lng).then(resp => {
                    locations.push(resp.results[0].formatted_address);
                    this.setState({
                        locations: newLocations
                    });
                });
            }
            console.log(this.state.ownerId);
            console.log(this.state.menu);
        });
    }



    render() {
        return (
            <body style = {{backgroundColor: '#708090'}}>
                <MenuBar/>
                <div>
                    <div class="sections">
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Edit Your Truck</span>
                        <div class = "editTruck" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                            <form id= "modify" onSubmit={this.handleSubmit}>

                                <span class = "editTruckHeader" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '20px', display: 'block'}}>Edit Truck Details</span>

                                <div class={styles.formnput}>
                                    <input id="truckName" name="truckName" class={styles.formelementinput} type="text" placeholder="Enter New Truck Name" value={this.state.truckName} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="truckName">Truck Name</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="description" name="description" class={styles.formelementinput} type="text" placeholder="Enter New Description" value={this.state.description} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="description">Description</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="scheduleInput" name="schedule" class={styles.formelementinput} type="text" placeholder="Enter New Schedule" value={this.state.schedule} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="schedule">Schedule</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Submit Changes</button>
                                </div>

                            </form>
                        </div>

                        <div class = "editRoute" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                            <table class={styles2.routeTable}>
                                <thead>
                                    <tr>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.locations.length != 0 ? this.state.locations.map(this.renderRoutes) : null}
                                </tbody>
                            </table>
                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "newRoute" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '0px', display: 'block'}}>Add Locations:</span>
                                    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={libraries}>
                                        <StandaloneSearchBox>
                                            <input id="routeInput" class={styles.formelementinput} name="routeInput" type="text" placeholder="Enter the Address"/>
                                        </StandaloneSearchBox>
                                    </LoadScript>
                                    <div class={styles.formelementbar} style={{ display: 'none' }}></div>
                                    <label class={styles.formelementlabel} style={{ display: 'none' }}for="routeInput">Route</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="button" onClick={this.handleRouteSubmit} style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Add to Route</button>
                                </div>
                        </div>

                        <div class = "newMenuItem" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>

                                <span class = "newMenuItem" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '20px', display: 'block'}}>Add Menu Item</span>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemName" class={styles.formelementinput} type="text" placeholder="Enter the food item's name" value={this.state.newMenuItemName} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemName">Item Name</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemType" class={styles.formelementinput} type="text" placeholder="Enter the food item's type" value={this.state.newMenuItemType} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemType">Item Type</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemPrice" class={styles.formelementinput} type="text" placeholder="Enter the food item's price" value={this.state.newMenuItemPrice} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemPrice">Item Price</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="button" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Add Item</button>
                                </div>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}
export default Signup;
