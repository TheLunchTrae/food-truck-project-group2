import React, { Component } from 'react';
import axios from 'axios';
import { nodes } from 'traverse';
import { ThreeDRotationSharp } from '@material-ui/icons';
import styles from './dashTable.module.scss';

class DashTable extends Component {

    constructor(){
        super();
        this.state = { subTrucks: [], ownTrucks: []};
        this.starHTML = this.starHTML.bind(this);
        this.createSubTruckRow = this.createSubTruckRow.bind(this);
        this.createOwnTruckRow = this.createOwnTruckRow.bind(this);
        this.avgRating = this.avgRating.bind(this);
        this.editTruck = this.editTruck.bind(this);
        this.deleteTruck = this.deleteTruck.bind(this);
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
                axios.get("http://localhost:8090/api/owner/trucks").then(resp =>{ 
                console.log(resp); 
                this.setState({
                        ownTrucks: resp.data
                    });
                    if(resp.data.length == 0){
                        document.getElementById("ownTable").classList.add(styles.noOwn);
                        document.getElementById("noOwn").classList.add(styles.show)
                    }
                    else {
                        document.getElementById("own").classList.add(styles.show);
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
                document.getElementById("noSub").classList.add(styles.show);
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

    starHTML(val, index){
        if(val === 'n'){
            return(
                <div class={styles.starHolder}>
                    <img class={styles.star} src={"https://i.imgur.com/VXxafZN.png"}/>
                </div>
            )
        } else {
            return (
                <div class={styles.starHolder}>
                    <img class={styles.star} src={"https://i.imgur.com/pCUD8Ad.png"} />
                </div>
            )
        }
    }

    avgRating(ratings){
        console.log(ratings);
        if(ratings.length == 0) return [];
        var avgRating = 0, count = 0;
        for(let i in ratings){
            avgRating+=i;
            ++count;
        }
        var stars = count === 0 ? -1 : Math.round(avgRating/count);
        count = 5-stars;

        var starArray = []
        if(stars != -1){
            for (let i = 0; i < stars; ++i){
                starArray.push('s');
            }
    
            for(let i = 0; i < count; ++i){
                starArray.push('n');
            }
        }
        return starArray;
    }

    editTruck(event){
        window.location.href="/editTruck?id=" + event.target.name;
    }

    deleteTruck(event){
        //Will add confirm event of some sort later
        axios.get("http://localhost:8090/api/deleteTruck/" + event.target.name).then(res => {
            console.log(res);
        })
    }

    createSubTruckRow(truck, index){
        console.log(truck);
        
        var starArray = this.avgRating(truck);
        return(
            <tr key={"s" + index} class={styles.tableRow}>
                <td>
                    <a href={"/truckDetails?truckId=" + truck.truckId} class={styles.tableText}>{truck.truckName}</a>
                </td>
                <td class={styles.tableText}>
                    {truck.description}
                </td>
                <td>
                    Route
                </td>
                <td class={styles.ratingColumn}>
                    {starArray.length != 0 ? starArray.map(this.starHTML): "This Truck Has Not Been Rated"}
                </td>
                <td>
                    Food Types
                </td>
            </tr>
        );
    }

    createOwnTruckRow(truck, index){
        var starArray = this.avgRating(truck.ratings);
        return(
            <tr key={"o" + index} class={styles.tableRow}>
                <td>
                    <a href={"/truckDetails?truckId=" + truck.truckId} class={styles.tableText}>{truck.truckName}</a>
                </td>
                <td class={styles.ratingColumn}>
                    {starArray.length != 0 ? starArray.map(this.starHTML): "This Truck Has Not Been Rated"}
                </td>
                <td class={styles.buttonColumn}>
                    <button name={truck.truckId} type="button" class={styles.tableButton} onClick={this.editTruck}>Edit</button>
                </td>
                <td class={styles.buttonColumn}> 
                    <button name={truck.truckId} type="button" class={styles.tableButton} onClick={this.deleteTruck}>Delete</button>
                </td>
            </tr>
        );
    }

    render(){
        return(
            <div class={styles.wrapper}>
                <div class={styles.componentDashTable}>
                    <div id="typeBar" class={styles.typeBar}>
                        <button class={styles.subButton} id="subButton" onClick={this.changeTab}>Subscribed Food Trucks</button>
                        <button class={styles.ownButton} id="ownButton" onClick={this.changeTab}>Your Food Trucks</button>
                    </div>
                    <div class={styles.tablesDiv}>
                        <div class={styles.subTable}>
                            <table id="subTable" class={styles.table}>
                                <thead class={styles.tableHeading}>
                                    <tr key="head">
                                        <th>Name</th>
                                        <th>Description</th>  
                                        <th>Route</th>      
                                        <th>Rating</th>       
                                        <th>Food Types</th>
                                    </tr>
                                </thead>
                                <tbody class={styles.tableBody}>
                                    {this.state.subTrucks.length != 0 ? this.state.subTrucks.map(this.createSubTruckRow) : null} 
                                </tbody>
                            </table>
                            <span id="noSub" class={styles.msg}>
                                <h5>
                                    You are not subscribed to any food trucks.<br/>
                                    Click <a href="/search">here</a> to find some trucks that interest you!
                                </h5>
                            </span>
                        </div>
                        <div class={styles.ownTable}>
                            <table id="ownTable" class={styles.table}>
                                <thead class={styles.tableHeading}>
                                    <tr key="head">
                                        <th>Name</th> 
                                        <th>Rating</th>       
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class={styles.tableBody}>
                                    {this.state.ownTrucks.length != 0 ?  this.state.ownTrucks.map(this.createOwnTruckRow) : null} 
                                </tbody>
                            </table>
                            <span id="own" class={styles.msg}>
                                <h5>
                                    Click <a href="/createTruck">here</a> to create a new food truck!
                                </h5>
                            </span>
                            <span id="noOwn" class={styles.msg}>
                                <h5>
                                    You do not own any Food Trucks.<br/>
                                    Click <a href="/createTruck">here</a> to get started!
                                </h5>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashTable;