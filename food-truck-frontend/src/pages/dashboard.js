import React, { Component } from 'react';
import './_app.js'
import UserSection from './dashboard/userSection.js';
import DashTable from './dashboard/dashTable.js';
import { MenuBar, DefaultMap } from './index.js';
import styles from './dashboard.module.scss';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', nearTrucks: [], containerStyle: { width: '400px', height: '350px' }, 
                        center: { lat: 31.547164416064646, lng: -97.11819049760257 } };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        if(sessionStorage.getItem('token') === null){
            window.location.href="/login";
        } else {
            var userId = sessionStorage.getItem('token');
            axios.get("http://localhost:8090/api/map/nearestTrucks/" + userId).then(res => {
                this.setState({
                    nearTrucks: res.data
                });
            }).catch(err => {
                console.log(err);
            });
            axios.get("http://localhost:8090/api/getPreferences").then(res => {
                console.log("Response")
                if(res.data.location != null){
                    console.log(res.data.location.latitude);
                    console.log(res.data.location.longitude);
                    var newCenter = { lat: res.data.location.latitude, lng: res.data.location.longitude };
                this.setState({
                    center: newCenter
                });
                }
                
            }).catch(err => {
                    console.log("Invalid Address");
            });
        }
    }

    render() {
        return (
            <body class={styles.body}>
                <MenuBar/>
                <h1 class={styles.dHeading}>Dashboard</h1>
                <div class={styles.wrapper}>
                    <UserSection/>
                    <DashTable/>
                <div class={styles.mapSection}>
                    <div class={styles.innerDiv}>
                        <h1 class={styles.nearbyHeading}>Nearby Trucks</h1>
                        <div class={styles.mapdiv}>
                            <DefaultMap class={styles.map} center={this.state.center} nearbyTrucks={this.state.nearTrucks} containerStyle={this.state.containerStyle}/>
                        </div>
                    </div>
                </div>
                </div>
            </body>
        );
    }
}
export default Dashboard;
