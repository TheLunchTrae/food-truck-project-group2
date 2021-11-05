import { HighlightSharp } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component } from 'react';
import './_app.js'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '' };
        
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {
    }
    componentDidMount() {
        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        if(id != null) {
            Axios.get("http://localhost:8080/api/details/" + id).then(res => {
                console.log(res);
                this.setState({ name: res.data });
            })
        }
        else {
            this.setState({name: "USER_NAME"});
        }
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#FFDAB9', marginLeft: '35px'}}>
                    <div>
                        <div style={{fontWeight: '500'}}>
                            <h1 class = "heading" style = {{marginBottom: '0px', fontSize: '2.3rem', color: '#0F52BA'}}>Dashboard</h1>
                            <p style = {{marginTop: '0px', fontSize: '1.3rem', color: '#002366'}}>Welcome to the Food Truck Finder Dashboard!</p>
                        </div>

                        <div class = "sections">
                            <div class = "userSection" style = {{float: 'left', borderRadius: '100px', background: '#FA8072', width: '25%', padding: '20px', display: 'inline-block', border: '3px solid black'}}>
                                <div>
                                    <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                                    <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>{ this.state.name }</span>
                                    <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>Customer</span>  {/*THIS IS GOING TO BE THE TYPE OF USER THEY ARE LOGGED IN AS -->*/}
                                    <hr style = {{border: '1px solid black', width: '75%'}}></hr>
                                    <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Notifications</u></span>
                                    <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification1</span>
                                    <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification2</span>
                                    <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification3</span>
                                    <a href="/createTruck">Create Truck</a>
                                </div>
                            </div>

                            <div class = "tableSection" style = {{marginLeft: '55px', float: 'left', borderRadius: '100px', background: '#FA8072', width: '65%', padding: '15px', display: 'inline-block', border: '3px solid black'}}>

                                <span class = "userName" style = {{color: '#000000', display: 'block', fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}><u>Subscriptions</u></span>

                                <table class = "foodTrucks" style = {{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                                    <thead style = {{color: '#0F52BA', fontSize: '1.5rem', margin: '25px 0px'}}>
                                        <tr>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                FOOD TRUCK
                                            </th>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                RATING
                                            </th>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                HOURS
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody style = {{color: '#FFFFFF', fontSize: '1.2rem'}}>
                                        <tr>
                                            <td>SUBSCRIPTION1</td>
                                            <td>*****</td>
                                            <td>OPEN</td>
                                        </tr>
                                        <tr>
                                            <td>SUBSCRIPTION2</td>
                                            <td>**</td>
                                            <td>CLOSED</td>
                                        </tr>
                                        <tr>
                                            <td>SUBSCRIPTION3</td>
                                            <td>***</td>
                                            <td>CLOSED DUE TO COVID</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Dashboard;
