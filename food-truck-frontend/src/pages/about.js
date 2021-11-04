import React, { Component } from 'react';
import axios from 'axios';

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
                <body style = {{backgroundColor: '#FFDAB9'}}>
                    <div>
                        <div class="sections" >
                            <div class = "login" style = {{alignContent: 'center', borderRadius: '100px', background: '#FA8072', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                                <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>About</span>

                                <br></br>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 30px'}}>
                                    <span id = "emailInput" style={{fontSize: '1.2rem', marginLeft: '10px', fontWeight: 'bold', display: 'block'}}>IDK WHAT YALL WANNA PUT HERE</span>
                                    <br></br>
                                    <span id = "emailInput" style={{fontSize: '1.2rem', marginLeft: '10px', fontWeight: 'bold'}}>This is the Food Truck Finder Application which is an application for...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default About;
