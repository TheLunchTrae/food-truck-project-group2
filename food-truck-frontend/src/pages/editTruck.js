import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { truckID: -1, truckName: '', route: '', schedule: '', menu: '', description: '', details: ''};
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
            menu: this.state.menu,
            description: this.state.description,
            details: this.state.details,
            route: this.state.route,
            schedule: this.state.schedule,
            truckName: this.state.truckName,
            truckID: this.state.truckID
        };

        //Post to URL
        const val = axios.post("http://localhost:8080/modifyTruck", truckDto).then(res => {
            console.log(res);
        });

        event.preventDefault()
    }
    
    componentDidMount() {
        // get the truck id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        this.state.truckID = id;
        console.log(this.state.truckID);

        // get the truck information from the database
        const val = axios.get("http://localhost:8080/getTruck/" + this.state.truckID).then(res => {
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
                <body style = {{backgroundColor: '#FFDAB9'}}>
                    <div>
                        <div class="sections" >
                            <div class = "createTruck" style = {{alignContent: 'center', borderRadius: '100px', background: '#FA8072', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Edit Your Truck</span>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "menu" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Menu:</span>
                                        <span id = "menuInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="menu" placeholder="Enter the Menu" value={this.state.menu} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>

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
                                        <span class = "details" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Details:</span>
                                        <span id = "detailsInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="details" placeholder="Enter the Details" value={this.state.details} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "route" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Route:</span>
                                        <span id = "routeInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="route" placeholder="Enter the Route" value={this.state.route} type="text" onChange={this.handleInputChange}/>
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
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Signup;
