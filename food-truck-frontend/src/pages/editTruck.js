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
        this.state = { ownerId: -1, truckId: -1, truckName: '', newRouteX: '', newRouteY: '', schedule: '', newMenuItemType: '', newMenuItemName: '', newMenuItemPrice: 0.0, description: '', newRating: 0.0, menu: [] };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);
        this.handleRouteSubmit = this.handleRouteSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
            alert("Changes saved");
        }
        else {
            alert("You are not the owner of this truck");
        }

        event.preventDefault()
    }
    //For adding new item
    handleMenuItemSubmit(event){
        if (this.state.ownerId == sessionStorage.getItem('token')) {
            const itemDto = {
                foodType: this.state.newMenuItemType,
                foodItemName: this.state.newMenuItemName,
                foodItemPrice: this.state.newMenuItemPrice
            }

            const JSONWrapper = {
                foodItem: {
                    foodType: this.state.newMenuItemType,
                    foodItemName: this.state.newMenuItemName,
                    foodItemPrice: this.state.newMenuItemPrice
                }
            };

            //Post to URL
            axios.post("http://localhost:8090/api/modifyTruck/menu", JSONWrapper, {headers:{'truckId': this.state.truckId}}).then(res => {
                console.log(res);
            });
            alert("Changes saved");
        }
        else {
            alert("You are not the owner of this truck");
        }

        event.preventDefault()
    }

    //For new location to add to route
    handleRouteSubmit(event){
        //Modified to be compatible with route being List<Location>
        if (this.state.ownerId == sessionStorage.getItem('token')) {
            const JSONWrapper = {
                location: {
                    latitude: this.state.newRouteX,
                    longitude: this.state.newRouteY
                }
            };
            
            axios.post("http://localhost:8090/api/modifyTruck/route", JSONWrapper, {headers:{'truckId': this.state.truckId}}).then(res => {
                console.log(res);
            });
            alert("Changes saved");
        }
        else {
            alert("You are not the owner of this truck");
        }

        event.preventDefault()
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
            console.log(this.state.ownerId);
            console.log(this.state.menu);
        });
    }

    deleteMenuItem(index) {
        if (this.state.ownerId == sessionStorage.getItem('token')) {
            axios.post("http://localhost:8090/api/modifyTruck/menu/remove/" + index, {
                headers: {
                    'truckId': this.state.truckId
                }
            }).then(res => {
                console.log(res);
            });
            alert("Changes saved");
        }
        else { 
            alert("You are not the owner of this truck");
        }

        event.preventDefault();
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
                            </table>
                            <form id= "route" onSubmit={this.handleRouteSubmit}>
                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span class = "newRoute" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '0px', display: 'block'}}>Add Locations:</span>
                                    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={libraries}>
                                        <StandaloneSearchBox>
                                            <input id="route" class={styles.formelementinput} name="route" type="text" placeholder="Route"/>
                                        </StandaloneSearchBox>
                                    </LoadScript>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="route">Route</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Submit New Route</button>
                                </div>
                            </form>
                        </div>

                        <div class = "newMenuItem" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '26%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>

                            <form onSubmit={this.handleMenuItemSubmit}>

                                <span class = "newMenuItem" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '20px', display: 'block'}}>Add Menu Item</span>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemName" class={styles.formelementinput} type="text" placeholder="Enter the food item's name" value={this.state.newMenuItemName} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemName">New Menu Item Name</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemType" class={styles.formelementinput} type="text" placeholder="Enter the food item's type" value={this.state.newMenuItemType} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemType">New Menu Item Type</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemPrice" class={styles.formelementinput} type="text" placeholder="Enter the food item's price" value={this.state.newMenuItemPrice} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemPrice">New Menu Item Price</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Submit New Item</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}
export default Signup;
