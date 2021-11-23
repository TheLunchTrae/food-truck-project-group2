import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';

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
                <body style = {{}}>
                    <MenuBar/>
                    <div class="sections" >

                        <div class="idk" style={{backgroundColor: '#708090', width: '100%', padding: '20px', textAlign: 'center'}}>
                            <span class="heading" style={{color: "#000000", marginTop: '40px', display: 'block', fontSize: '3.7rem', textAlign: 'center', fontWeight: 'bold'}}>About</span>
                            <span id = "text1" style={{color: "#FFFFFF", fontSize: '1.8rem', marginTop: '10px', marginBottom: '40px', marginLeft: '10px', fontWeight: 'bold', display: 'block'}}>Group 2 - Food Truck Finder Application</span>
                        </div>


                        <div class = "block" style = {{alignContent: 'center', width: '75%', margin: '20px auto', textAllign: 'center'}}>

                            <br></br>

                            <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 30px'}}>

                                <br></br>
                                <span id = "text2" style={{fontSize: '1.3rem', marginLeft: '10px', fontWeight: 'bold'}}>Welcome to the Food Truck Finder Application! This application was created & developed by Sam Hobbs, Trae Stevens, Joshua Hunter & Tyler Ross. The Food Truck Finder Application is built and responsible for...</span>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default About;
