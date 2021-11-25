import React, { Component } from 'react';
import './_app.js'
import axios from 'axios';
import { FormatAlignLeftRounded } from '@material-ui/icons';
import UserSection from './dashboard/userSection.js';
import DashTable from './dashboard/dashTable.js';
import { MenuBar, MapComponent } from './index.js';
import styles from './userDash.module.scss';

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
        if(sessionStorage.getItem('token') === null){
            window.location.href="/login";
        }
    }

    render() {
        return (
            <html>
                <body class={styles.body}>
                    <MenuBar/>
                    <h1 class={styles.dHeading}>Dashboard</h1>
                    <div class={styles.wrapper}>
                        <div class={styles.userSectionParent}>
                            <UserSection/>
                        </div>
                        <div class={styles.dashTableParent}>
                            <DashTable/>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Dashboard;
