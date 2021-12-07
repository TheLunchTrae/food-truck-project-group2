import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';
import styles from './signup.module.scss';
import styles2 from './editTruck.module.scss';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const libraries = ['places'];

class EditTruck extends Component {
    constructor(props) {
        super();
        this.state = { ownerId: -1, truckId: -1, truckName: '', schedule: '', description: '', route: [], locations: [], menu: [], newMenuItemName: '', newMenuItemType: '', newMenuItemPrice: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);
        this.handleRouteSubmit = this.handleRouteSubmit.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.removeMenuItem = this.removeMenuItem.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderRoutes = this.renderRoutes.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
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

            var post = axios.post("http://localhost:8090/api/modifyTruck/route", newRoute).then(res => {
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

    //For new location to add to route
    handleRouteSubmit(){
        Geocode.fromAddress(document.getElementById('routeInput').value).then(res => {
            var loc = res.results[0].geometry.location
            const latitude = loc.lat;
            const longitude = loc.lng;
            axios.post("http://localhost:8090/api/modifyTruck/route",  {
                latitude: latitude,
                longitude: longitude
            }, {
                headers: {
                    'truckId': this.state.truckId
                }
            }).then(resp => {
                console.log(resp);
            })
            var newRoute = this.state.route;
            newRoute.push({ latitude, longitude });

            var newLocations = []
            for(let i = 0; i < newRoute.length; ++i){
                Geocode.fromLatLng(newRoute[i].latitude, newRoute[i].longitude).then(resp => {
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

    handleMenuItemSubmit(event){
        if (this.state.ownerId == sessionStorage.getItem('token')) {
            const foodItem = {
                foodType: this.state.newMenuItemType,
                foodItemName: this.state.newMenuItemName,
                foodItemPrice: this.state.newMenuItemPrice
            };

            var newMenu = this.state.menu;
            newMenu.push(foodItem);
            this.setState({
                menu: newMenu
            })

            //Post to URL
            axios.post("http://localhost:8090/api/modifyTruck/menu", foodItem, {
                headers: {
                    'truckId': this.state.truckId
                }
            }).then(res => {
                console.log(res);
            });
        }
        else {
            alert("You are not the owner of this truck");
        }

        event.preventDefault()
    }

    removeMenuItem(event){
        var newMenu = this.state.menu;
        var index = event.target.value;
        newMenu.splice(index, 1);
        axios.get("http://localhost:8090/api/modifyTruck/menu/remove/" + index, {
            headers: {
                'truckId': this.state.truckId
            }
        }).then(res => {
            console.log(res);
            this.setState({
                menu: newMenu
            });
        })
        event.preventDefault();
    }

    renderMenuItem(item, index){
        return (
            <tr key={index}>
                <td>{item.foodItemName}</td>
                <td>{item.foodType}</td>
                <td>{item.foodItemPrice}</td>
                <td>
                    <button value={index} class={styles2.deleteButton} onClick={this.removeMenuItem}>Remove Item</button>
                </td>
            </tr>
        )
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
            if(this.state.ownerId === sessionStorage.getItem('token')){
                axios.interceptors.request.use(req => {
                    req.headers['truckId']=this.state.truckId;
                    return req;
                });
            }
            
            var newLocations = [];
            for(let i = 0; i < this.state.route.length; ++i){
                Geocode.fromLatLng(this.state.route[i].latitude, this.state.route[i].longitude).then(resp => {
                    newLocations.push(resp.results[0].formatted_address);
                    this.setState({
                        locations: newLocations
                    });
                }).catch(err => {
                    console.log("Invalid Address");
                });
            }
            console.log(this.state.locations);
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
                                        <th class={styles2.rth}>Address</th>
                                        <th class={styles2.rth}/>
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
                            <table class={styles2.menuTable}>
                                <thead>
                                    <tr>
                                        <th class={styles2.mth}>Name</th>
                                        <th class={styles2.mth}>Type</th>
                                        <th class={styles2.mth}>Price</th>
                                        <th class={styles2.mth}/>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.menu.length != 0 ? this.state.menu.map(this.renderMenuItem) : null}
                                </tbody>
                            </table>
                            <span class = "newMenuItem" style = {{fontSize: '1.4rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '20px', display: 'block'}}>Add Menu Item</span>
                            <form onSubmit={this.handleMenuItemSubmit}>
                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemName" class={styles.formelementinput} type="text" placeholder="Enter the food item's name" value={this.state.newMenuItemName} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemName">Name</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemType" class={styles.formelementinput} type="text" placeholder="Enter the food item's type" value={this.state.newMenuItemType} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemType">Type</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="itemInput" name="newMenuItemPrice" class={styles.formelementinput} pattern='[1-9]{1}[0-9]{0,1}\.[0-9]{0,2}' type="text" placeholder="Enter the food item's price" value={this.state.newMenuItemPrice} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="newMenuItemPrice">Price</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Add Item</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}
export default EditTruck;
