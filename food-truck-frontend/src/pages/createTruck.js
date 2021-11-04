import React, { Component } from 'react';
import axios from 'axios';
import {wait} from "@testing-library/dom";
import { Public } from '@material-ui/icons';

class Signup extends Component {
    constructor(props) {
        super();
<<<<<<< HEAD
        this.state = { menu: '', description: '', details: '', route: '', schedule: '', truckName: '' };
=======
        this.state = { ownerId: -1, menu: '', description: '', details: '', route: '', schedule: '', name: '' };
>>>>>>> f176b36891da32748134b11223c9bb30cbf65431
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
<<<<<<< HEAD
            truckName: this.state.truckName,
=======
            name: this.state.name,
            ownerId: this.state.ownerId
>>>>>>> f176b36891da32748134b11223c9bb30cbf65431
        };

        //Post to URL
        const val = axios.post("http://localhost:8080/addTruck", truckDto).then(res => {
            console.log(res);
<<<<<<< HEAD
            /*this.setState({
=======
            this.setState({
>>>>>>> f176b36891da32748134b11223c9bb30cbf65431
                menu: '',
                description: '',
                details: '',
                route: '',
                schedule: '',
<<<<<<< HEAD
                truckName: ''
=======
                name: ''
>>>>>>> f176b36891da32748134b11223c9bb30cbf65431
            });
            */
        });

        event.preventDefault()
    }
    
    componentDidMount() {
        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
<<<<<<< HEAD
=======
        this.state.ownerId = id;
        console.log(this.state.ownerId);
>>>>>>> f176b36891da32748134b11223c9bb30cbf65431
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
                                            <input name="menu" placeholder="Enter the Menu" value={this.state.menu} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "name" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Truck Name:</span>
                                        <span id = "name" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="name" placeholder="Enter the Truck Name" value={this.state.name} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "description" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Description:</span>
                                        <span id = "descriptionInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="description" placeholder="Enter the Description" value={this.state.description} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "details" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Details:</span>
                                        <span id = "detailsInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="details" placeholder="Enter the Details" value={this.state.details} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "route" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Route:</span>
                                        <span id = "routeInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="route" placeholder="Enter the Route" value={this.state.route} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                        <span class = "schedule" style = {{marginLeft: '80px', display: 'inline-block', fontSize: '1.5rem', textAlign: 'left', fontWeight: 'bold', marginTop: '5px'}}>Schedule:</span>
                                        <span id = "scheduleInput" style={{fontSize: '1.5rem', textAlign: 'left', marginLeft: '10px'}}>
                                            <input name="schedule" placeholder="Enter the Schedule" value={this.state.schedule} type="text" onChange={this.handleInputChange}/>
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
