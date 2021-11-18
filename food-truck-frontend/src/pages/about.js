import React, { Component } from 'react';
import axios from 'axios';
import MenuBar from '../menuBar'

class About extends Component {
    constructor(props) {
        super();
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {

    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div class="sections" >
                        <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                            <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>About</span>
                            <br></br>

                            <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 30px'}}>
                                <span id = "text1" style={{fontSize: '1.5rem', marginLeft: '10px', fontWeight: 'bold', display: 'block'}}>Group 2 - Food Truck Finder Application</span>
                                <br></br>
                                <span id = "text2" style={{fontSize: '1.2rem', marginLeft: '10px', fontWeight: 'bold'}}>This is the Food Truck Finder Application which is an application for...</span>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default About;
