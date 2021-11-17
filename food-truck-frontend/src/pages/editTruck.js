import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { truckId: -1, truckName: '', newRouteX: '', newRouteY: '', schedule: '', newMenuItemType: '', newMenuItemName: '', newMenuItemPrice: 0.0, description: '', newRating: 0.0};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);
        this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
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
        const truckDto = {
            description: this.state.description,
            schedule: this.state.schedule,
            truckName: this.state.truckName,
            truckId: this.state.truckId
        };

        //Post to URL
        const val = axios.post("http://localhost:8090/api/modifyTruck", truckDto).then(res => {
            console.log(res);
        });

        event.preventDefault()
    }
    //For adding new item
    handleMenuItemSubmit(event){
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
        const val = axios.post("http://localhost:8090/api/modifyTruck/menu/", JSONWrapper, {headers:{'truckId': this.state.truckId}}).then(res => {
            console.log(res);
        });

        event.preventDefault()
    }
    //For adding new rating (FOR DEBUGGING - REMOVE LATER)
    handleRatingSubmit(event){
        const JSONWrapper = {
            rating: this.state.newRating
        };
        
        const val = axios.post("http://localhost:8090/api/addRating/", JSONWrapper, {headers:{'truckId': this.state.truckId}}).then(res => {
            console.log(res);
        });
        event.preventDefault()

    }

    //For new location to add to route
    handleRouteSubmit(event){
        //Modified to be compatible with route being List<Location>
        const JSONWrapper = {
            location: {
                xcoordinate: this.state.newRouteX,
                ycoordinate: this.state.newRouteY
            }
        };
        
        const val = axios.post("http://localhost:8090/api/modifyTruck/route/", JSONWrapper, {headers:{'truckId': this.state.truckId}}).then(res => {
            console.log(res);
        });

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
        const val = axios.get("http://localhost:8090/api/getTruck/" + this.state.truckId).then(res => {
            console.log(res);
            this.setState({
                truckName: res.data.truckName,
                route: res.data.route,
                schedule: res.data.schedule,
                menu: res.data.menu,
                description: res.data.description,
                details: res.data.details
            });
        });
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>

                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
                        <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                            <div class="navigation" style = {{height: '60px'}}>
                                  <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                                    Food Truck Finder
                                  </a>
                                 <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                                    <a href = "\signup" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Sign Up</a>
                                    <a href = "\login" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Log In</a>
                                    <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                                    <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>
                                    <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                                </nav>
                            </div>
                        </div>

                        <div>
                            <div class="sections" >
                                <div class = "editTruck" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                                    <form id= "modify" onSubmit={this.handleSubmit}>
                                        <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Edit Your Truck</span>

                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "truckName" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Truck Name:</span>
                                            <span id = "truckName" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="truckName" placeholder="Enter the Truck Name" value={this.state.truckName} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "description" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Description:</span>
                                            <span id = "descriptionInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="description" placeholder="Enter the Description" value={this.state.description} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "schedule" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Schedule:</span>
                                            <span id = "scheduleInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="schedule" placeholder="Enter the Schedule" value={this.state.schedule} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <br></br>

                                        <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <input type="submit" value="Submit"/>
                                        </span>
                                    </form>

                                    <br></br>
                                    
                                    <form id= "route" onSubmit={this.handleRouteSubmit}>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "newRoute" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Route Location:</span>
                                            <span id = "routeInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="newRouteX" pattern= "^[-+]?[0-9]*\.?[0-9]+$" title="Must be valid float (w/period)" placeholder="Enter the X Coordinate" value={this.state.newRouteX} type="text" onChange={this.handleInputChange}/>
                                                <input name="newRouteY" pattern= "^[-+]?[0-9]*\.?[0-9]+$" title="Must be valid float (w/period)" placeholder="Enter the Y Coordinate" value={this.state.newRouteY} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>
                                        <br></br>

                                        <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <input type="submit" value="Submit"/>
                                        </span>

                                    </form>

                                    <br></br>

                                    <form onSubmit={this.handleMenuItemSubmit}>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "newMenuItemType" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Menu Item Type:</span>
                                            <span id = "itemInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="newMenuItemType" placeholder="Enter the food item's food type" value={this.state.newMenuItemType} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "newMenuItemName" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Menu Item Name:</span>
                                            <span id = "itemInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="newMenuItemName" placeholder="Enter the food item's food type" value={this.state.newMenuItemName} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "newMenuItemPrice" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Menu Item Price:</span>
                                            <span id = "itemInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="newMenuItemPrice" placeholder="Enter the food item's price" value={this.state.newMenuItemPrice} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <br></br>

                                        <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <input type="submit" value="Submit"/>
                                        </span>

                                    </form>

                                    <br></br>

                                    <form onSubmit={this.handleRatingSubmit}>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "newRating" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>New Rating:</span>
                                            <span id = "ratingInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="newRating" placeholder="Select a new rating (DEBUG)" value={this.state.newRating} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>
                                        <br></br>

                                        <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <input type="submit" value="Submit"/>
                                        </span>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Signup;
