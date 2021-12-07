import React, { Component } from 'react';
import axios from 'axios';
import styles from './createTruck.module.scss';
import { MenuBar } from './index.js';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = [ 'places' ]

class CreateTruck extends Component {
    constructor(props) {
        super();
        //this.state = { truckName: '', route: '', schedule: '', menu: '', description: '', details: ''};
        this.state = { truckName: '', schedule: '', description: '', start: '', route: [], menu: ''};
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
            truckName: this.state.truckName,
            description: this.state.description,
            //details: this.state.details,
            //route: this.state.route,
            //schedule: this.state.schedule,
        };

        console.log(truckDto);
        console.log(this.state.menu);

        const truckAndString = {
            foodTruck: truckDto,
            string: this.state.menu
        }

        //Post to URL
        let token = sessionStorage.getItem('token');
        const val = axios.post("http://localhost:8090/api/addTruck", truckAndString, {
        }, {
            headers: {
                'token': token
            }
        }).then(res => {
            console.log(res);
        });

        console.log(val);

        alert("Truck Created");
        event.preventDefault();
        window.location.href = '/dashboard';
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
            <body style = {{backgroundColor: '#90AACB'}}>
                <MenuBar/>
                <div class="sections">
                    <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px', padding: '20px'}}>New Truck</span>
                    <div class = "formDiv" style = {{backgroundColor: '#FFFFFF', alignContent: 'center', width: '25%', padding: '30px', margin: '20px auto', textAllign: 'center'}}>
                        <form onSubmit={this.handleSubmit}>
                            <div class={styles.wrapper}>

                                <div class={styles.formnput}>
                                    <input id="truckName" name="truckName" class={styles.formelementinput} value={this.state.truckName} type="input" placeholder="Please write your trucks name"  required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="truckName">Truck Name</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="description" name="description" class={styles.formelementinput} type="input" placeholder="Please write a description for your truck"  value={this.state.description} required onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="description">Description</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="routeStart" name="routeStart" class={styles.formelementinput} type="input" placeholder="Please write a description for your truck" required/>
                                    <div class={styles.formelementbar}></div>
                                    <label class={styles.formelementlabel} for="routeStart">Route Start</label>
                                </div>

                                <div class={styles.formnput}>
                                    <input id="menu" name="menu" class={styles.formelementinput} type="input" placeholder="Please write the menu for your truck" required value={this.state.menu} onChange={this.handleInputChange}/>
                                    <div class={styles.formelementbar}></div>
                                    <p>Type your menu is the form "Name Price Food Type,"</p>
                                    <label class={styles.formelementlabel} for="menu">Menu</label>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <button type="submit" style = {{background: '#708090', fontSize: '17px', cursor: 'pointer'}}>Create Truck</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        );
    }
}
export default CreateTruck;
