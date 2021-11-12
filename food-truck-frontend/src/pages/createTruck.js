import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super();
        this.state = { truckName: '', route: '', schedule: '', menu: '', description: '', details: ''};
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
            truckName: this.state.truckName,
            description: this.state.description,
            details: this.state.details,
            route: this.state.route,
            schedule: this.state.schedule,
        };

        console.log(truckDto);

        //Post to URL
        const val = axios.post("http://localhost:8090/api/addTruck", truckDto, {
            headers : {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res);
            /*this.setState({
                truckName: '',
                route: '',
                schedule: '',
                menu: '', 
                description: '',
                details: ''
            });
            */
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

                        <div class="sections" >
                            <div class = "createTruck" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Create A New Truck</span>

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
