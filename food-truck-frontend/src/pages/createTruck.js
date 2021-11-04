import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { OwnerId: '', Menu: '', Description: '', Details: '', Route: '', Schedule: '', TruckName: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
        
    }
    handleSubmit(event) {
        //Object that will be passed containing the users information
        const truckDto = {
            menu: this.state.Menu,
            description: this.state.Description,
            details: this.state.Details,
            route: this.state.Route,
            schedule: this.state.Schedule,
            truckName: this.state.TruckName,
            ownerId: this.state.OwnerId
        };

        //Post to URL
        const val = axios.post("http://localhost:8080/addTruck", truckDto).then(res => {
            console.log(res);
            this.setState({
                Menu: '',
                Description: '',
                Details: '',
                Route: '',
                Schedule: '',
                TruckName: '',
                OwnerId: ''
            });
        });

        event.preventDefault()
    }
    componentDidMount() {
        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        this.state.OwnerId = id;
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#FFDAB9', marginLeft: '35px'}}>
                    <div>
                        <div class="sections" >
                            <div class = "signup" style = {{alignContent: 'center', float: 'left', borderRadius: '100px', background: '#FA8072', width: '50%', padding: '20px', display: 'inline-block', marginTop: '20px', marginLeft: '670px'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '4.5rem', textAlign: 'center', fontWeight: 'bold'}}>Create A New Truck</span>
                                    <span class = "menu" style = {{marginLeft: '27px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Menu:</span>
                                        <span id = "menuInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="menu" placeholder="Enter the Menu" value={this.state.Menu} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "truckName" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Truck Name:</span>
                                        <span id = "truckNameInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="truckName" placeholder="Enter the Truck Name" value={this.state.TruckName} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "description" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Description:</span>
                                        <span id = "descriptionInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="description" placeholder="Enter the Description" value={this.state.Description} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "details" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Details:</span>
                                        <span id = "detailsInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="details" placeholder="Enter the Details" value={this.state.Details} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "route" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Route:</span>
                                        <span id = "routeInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="route" placeholder="Enter the Route" value={this.state.Route} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "schedule" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Schedule:</span>
                                        <span id = "scheduleInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="schedule" placeholder="Enter the Schedule" value={this.state.Schedule} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    <br></br>
                                    <span style={{marginLeft: '200px'}}>
                                        <input type="submit" value="Create"/>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Signup;
