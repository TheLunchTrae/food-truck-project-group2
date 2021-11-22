import React, { Component } from 'react';
import axios from 'axios';
import styles from './dashTable.module.scss';

class DashTable extends Component {

    constructor(){
        super();
    }

    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo").then(res => {
            if(res.data.usertype === "Customer"){
                document.getElementById("typeBar").classList.add(styles.customer);
                document.getElementById("typeBar").classList.add(styles.subTab);
            } else {
                document.getElementById("typeBar").classList.add(styles.owner);
                document.getElementById("typeBar").classList.add(styles.ownTab);
            }
        })

    }

    changeTab(event){
        console.log("Showing " + event.target.id + " tab");
        const sub = document.getElementById("subButton").classList;
        const own = document.getElementById("ownButton").classList;
        if(event.target.id === "subButton"){
            document.getElementById("typeBar").classList.add(styles.subTab);
            document.getElementById("typeBar").classList.remove(styles.ownTab);
        } else if(event.target.id === "ownButton") {
            document.getElementById("typeBar").classList.add(styles.ownTab);
            document.getElementById("typeBar").classList.remove(styles.subTab);
        }
    }

    render(){
        return(
            <div class={styles.wrapper}>
                <div id="typeBar" class={styles.typeBar}>
                    <button class={styles.subButton} id="subButton" onClick={this.changeTab}>Subscribed Food Trucks</button>
                    <button class={styles.ownButton} id="ownButton" onClick={this.changeTab}>Your Food Trucks</button>
                </div>
                <div class={styles.displayTable}>
                    <span class={styles.subTrucks}>
                        <table class={styles.table}>
                            <th class={styles.tableHeading}>Name</th>
                            <th class={styles.tableHeading}>Description</th>     
                            <th class={styles.tableHeading}>Rating</th>       
                            <th class={styles.tableHeading}>Food Types</th>
                            <th class={styles.tableHeading}>Owner</th>    
                        </table>
                    </span>
                    <span class={styles.ownTrucks}>
                        <table class={styles.table}>
                            <tr class={styles.tableRow}>
                                <th class={styles.tableHeading}>Truck Name</th> 
                                <th class={styles.tableHeading}>Rating</th>       
                                <th class={styles.tableHeading}>Food Types</th>  
                                <th class={styles.tableHeading}></th>
                            </tr>
                        </table>
                    </span>
                </div>
            </div>
            
            
        );
    }
}

export default DashTable;