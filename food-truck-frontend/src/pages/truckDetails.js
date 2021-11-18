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
                <body style = {{backgroundColor: '#90AACB'}}>
                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
                        <div className="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                            <div className="navigation" style = {{height: '60px'}}>
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
                            <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                                <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Truck Details</span>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                 <label>
                                     <span class = "ratingPref" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Rating Preference:</span>
                                 </label>
                                 <span id = "foodLocInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                     <select name="usertype">
                                        <option value="" selected disabled hidden>N/A</option>
                                         <option value="1">***** (5)</option>
                                         <option value="2">**** (4)</option>
                                         <option value="3">*** (3)</option>
                                        <option value="4">** (2)</option>
                                        <option value="5">* (1)</option>
                                     </select>
                                 </span>
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
