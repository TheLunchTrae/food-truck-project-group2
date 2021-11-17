import React, { Component } from 'react';
import './_app.js'
import axios from 'axios';
import { FormatAlignLeftRounded } from '@material-ui/icons';
import MenuBar from '../menuBar.js';
import UserSection from './dashboard/userSection.js';

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
        if(sessionStorage.getItem('token') === null){
            window.location.href="/login";
        }
    }

    render() {
        return (
            <html lang='en'>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div style={{fontWeight: '500'}}>
                        <h1 class = "heading" style = {{width: '100vw', textAlign: 'center', marginBottom: '0px', fontSize: '2.3rem', color: '#000000'}}>Dashboard</h1>
                        <p style = {{width: '100vw', textAlign: 'center', marginTop: '0px', fontSize: '1.3rem', color: '#FFFFFF'}}>Welcome to the Food Truck Finder Dashboard!</p>
                    </div>
                    <div class = "sections">
                        <UserSection/>
                    </div>
                </body>
                
            </html>
        );
    }
}
export default Dashboard;
