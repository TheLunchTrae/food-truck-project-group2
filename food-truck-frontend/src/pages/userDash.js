import React, { Component } from 'react';
import './_app.js'
import axios from 'axios';
import { FormatAlignLeftRounded } from '@material-ui/icons';
import MenuBar from '../menuBar.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', foodTruckData: [] };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    handleChangeStatus(event) {

    }

    handleInputChange(event) {

    }

    handleSubmit(event) {

    }
    
    componentDidMount() {
        
    }

    renderNotifications() {

    }

    renderSubsctions() {

    } 

    renderFoodTrucks() { 

    }   

    myURL(id){
        
    }
    render() {
        return (
            <html lang='en'>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div style={{fontWeight: '500'}}>
                        <h1 class = "heading" style = {{marginBottom: '0px', fontSize: '2.3rem', color: '#000000'}}>Dashboard</h1>
                        <p style = {{marginTop: '0px', fontSize: '1.3rem', color: '#FFFFFF'}}>Welcome to the Food Truck Finder Dashboard!</p>
                    </div>
                    <div class = "sections">
                        <div class = "userSection" style = {{float: 'left', borderRadius: '100px', background: '#F9D5A7', width: '25%', padding: '20px', display: 'inline-block', border: '3px solid black'}}>
                            <div>
                                <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                                <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>{ this.state.name }</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>Food Truck Owner</span>  {/*THIS IS GOING TO BE THE TYPE OF USER THEY ARE LOGGED IN AS -->*/}
                                <hr style = {{border: '1px solid black', width: '75%'}}></hr>
                                <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Notifications</u></span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification1</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification2</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification3</span>

                                <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Preference Modification</u></span>
                                
                                <form id= "modify" onSubmit={this.handlePreferenceSubmit}>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "foodTypePref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Food Type Preference:</span>
                                        <span id = "foodTypeInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="foodTypePref" value={this.state.foodTypePref} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>
                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "locationPref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Location Preference:</span>
                                        <span id = "locationInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="locationPref" value={this.state.locationPref} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>
                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "ratingPref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Rating Preference:</span>
                                        <span id = "ratingInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="ratingPref" value={this.state.ratingPref} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>
                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "pricePref" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Price Preference:</span>
                                        <span id = "priceInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="pricePref" value={this.state.pricePref} type="text" onChange={this.handleInputChange}/>
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
export default Dashboard;
