import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';

class CreateTruck extends Component {
    constructor(props) {
        super();
        //this.state = { truckName: '', route: '', schedule: '', menu: '', description: '', details: ''};
        this.state = { truckName: '', schedule: '', description: ''};
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
            //menu: this.state.menu,
            truckName: this.state.truckName,
            description: this.state.description,
            //details: this.state.details,
            //route: this.state.route,
            schedule: this.state.schedule,
        };

        console.log(truckDto);

        //Post to URL
        let token = sessionStorage.getItem('token');
        const val = axios.post("http://localhost:8090/api/addTruck", truckDto, {
            headers: {
                'token': token
            }
        }).then(res => {
            console.log(res);
        });

        console.log(val);

        event.preventDefault()
    }
    
    componentDidMount() {
        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div class="sections" >
                        <div class = "createTruck" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                            <form onSubmit={this.handleSubmit}>
                                <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Create A New Truck</span>


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
                                    <input type="submit" value="Create"/>
                                </span>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default CreateTruck;
