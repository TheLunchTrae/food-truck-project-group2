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
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                </body>
            </html>
        );
    }
}
export default Dashboard;
