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
        this.state = { name: '', nearTrucks: [], containerStyle: { width: '400px', height: '350px', } };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        if(sessionStorage.getItem('token') === null){
            window.location.href="/login";
        } else {
            var userId = sessionStorage.getItem('token');
            axios.get("http://localhost:8090/api/map/nearestTrucks/" + userId).then(res => {
                console.log("Near")
                console.log(res)
                this.setState({
                    nearTrucks: res.data
                });
            }).catch(err => {
                console.log(err);
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
                            <DefaultMap class={styles.map} nearbyTrucks={this.state.nearTrucks} containerStyle={this.state.containerStyle}/>
                        </div>
                    </div>
                </div>
                </div>
            </body>
        );
    }
}
export default Dashboard;
