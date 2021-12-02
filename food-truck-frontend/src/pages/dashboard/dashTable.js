import React, { Component } from 'react';
import axios from 'axios';
import { nodes } from 'traverse';
import { ThreeDRotationSharp } from '@material-ui/icons';
import styles from './dashTable.module.scss';

class DashTable extends Component {

    constructor(){
        super();
        this.state = { subTrucks: [], ownTrucks: []};
    }

    componentDidMount(){
        //Get userinfo to determine type of tabbar
        axios.get("http://localhost:8090/api/userinfo").then(res => {
            if(res.data.usertype === "Customer"){
                document.getElementById("typeBar").classList.add(styles.customer);
                document.getElementById("typeBar").classList.add(styles.subTab);
            } else {
                document.getElementById("typeBar").classList.add(styles.owner);
                document.getElementById("typeBar").classList.add(styles.ownTab);
                axios.get("http://localhost:8090/api/owner/trucks").then(res =>{ 
                console.log(res); 
                this.setState({
                        ownTrucks: res.data
                    });
                    if(res.data.length == 0){
                        document.getElementById("ownTable").classList.add(styles.noOwn);
                    }
                    else {
                        document.getElementById("ownTable").classList.add(styles.own);
                    }
                })
            }
        }).catch(err => {
            console.log(err);
            document.getElementById("typeBar").classList.add(styles.ownTab);
        });

        axios.get("http://localhost:8090/api/user/subscriptions").then(res =>{
            this.setState({
                subTrucks: res.data
            });
            if(res.data.length == 0){
                document.getElementById("subTable").classList.add(styles.noSub);
            }
        }).catch(err => {
            console.log(err);
        });

        document.querySelector("tr").className=styles.tableRow;
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

    createTruckRow(truck, index){
        console.log(truck);
        return(
            <tr key={index} class={styles.tableRow}>
                <td>
                    <a href={"/truckDetails?truckId=" + truck.truckId} class={styles.tableText}>{truck.truckName}</a>
                </td>
                <td class={styles.tableText}>
                    {truck.description}
                </td>
                <td>
                    Location
                </td>
                <td>
                    {/*Will setup to show stars for rating}*/}
                    Rating
                </td>
                <td>
                    Food Types
                </td>
            </tr>
        );
    }

    render(){
        return(
            <div class={styles.dashTable}>
                <div id="typeBar" class={styles.typeBar}>
                    <button class={styles.subButton} id="subButton" onClick={this.changeTab}>Subscribed Food Trucks</button>
                    <button class={styles.ownButton} id="ownButton" onClick={this.changeTab}>Your Food Trucks</button>
                </div>
                <div class={styles.displayTable}>
                    <span class={styles.subTrucks}>
                        <table id="subTable" class={styles.table}>
                            <thead class={styles.tableHeading}>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>  
                                    <th>Location</th>      
                                    <th>Rating</th>       
                                    <th>Food Types</th>
                                </tr>
                            </thead>
                            <tbody class={styles.tableBody}>
                                {this.state.subTrucks.length != 0 ? this.state.subTrucks.map(this.createTruckRow) : null} 
                            </tbody>
                        </table>
                        <span class={styles.noSub}>
                            <h5>
                                You are not subscribed to any food trucks.<br/>
                                Click <a href="/search">here</a> to find some trucks that interest you!
                            </h5>
                        </span>
                    </span>
                    <span class={styles.ownTrucks}>
                        <table id="ownTable" class={styles.table}>
                            <thead class={styles.tableHeading}>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>  
                                    <th>Location</th>      
                                    <th>Rating</th>       
                                    <th>Food Types</th>
                                </tr>
                            </thead>
                            <tbody class={styles.tableBody}>
                                {this.state.ownTrucks.length != 0 ?  this.state.ownTrucks.map(this.createTruckRow) : null} 
                            </tbody>
                        </table>
                        <span class={styles.own}>
                            <h5>
                                Click <a href="/createTruck">here</a> to add another food truck!
                            </h5>
                        </span>
                        <span class={styles.noOwn}>
                            <h5>
                                You do not own any Food Trucks.<br/>
                                Click <a href="/createTruck">here</a> to get started!
                            </h5>
                        </span>
                    </span>
                </div>
            </div>
            
            
        );
    }
}

export default DashTable;