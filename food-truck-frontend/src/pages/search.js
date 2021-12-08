import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';
import { MenuBar } from './index.js'
import styles from './search.module.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucksRec: [], foodTrucksSearch: [], nearbyTrucks: [], search: '', listColor: 'white' };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderTrucks = this.renderTrucks.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.starHTML = this.starHTML.bind(this);
        this.avgRating = this.avgRating.bind(this);
        this.viewTruck = this.viewTruck.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });

        console.log(this.state.search);

        if (this.state.search.length > 0) {
            Axios.get("http://localhost:8090/api/searchQuery/" + this.state.search, {
                headers: {
                    'token': sessionStorage.getItem('token')
                }
                }).then(res => {
                    console.log(res.data);
                    this.setState({ foodTrucksSearch: res.data });
            });
        }
    }
    handleSubmit(event) {
        if (this.state.search.length > 0) {
            Axios.get("http://localhost:8090/api/searchQuery/" + this.state.search, {
                headers: {
                    'token': sessionStorage.getItem('token')
                }
                }).then(res => {
                    console.log(res.data);
                    this.setState({ foodTrucksSearch: res.data });
            });
        }
    }
    componentDidMount() {
        Axios.get("http://localhost:8090/api/search/recommended", {
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            this.setState({ foodTrucksRec: res.data });
        }).catch(err => {
             console.log(err);
        });
        if(sessionStorage.getItem('token') != null){
            Axios.post("http://localhost:8090/api/map/nearestTrucks", null, {
                headers: {
                    'userId': sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.data);
                this.setState({ nearbyTrucks: res.data });
            }).catch(err => {
                console.log(err);
            });
        } else {
            document.getElementById('nearby').classList.add(styles.hidden);
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
        for(let i = 0; i < ratings.length; ++i){
            avgRating+=ratings[i].value;
            ++count;
        }
        var stars = (count === 0 ? -1 : Math.round(avgRating/count));
        count = 5-stars;

        console.log(stars, count);

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

    viewTruck(event){
        window.location.href="/truckDetails?truckId=" + event.target.value;
    }

    renderTrucks(truck, index) {
        var starArray = this.avgRating(truck.ratings);
        return(
            <tr key={"s" + index} class={styles.tableRow}>
                <td>
                    {truck.truckName}
                </td>
                <td class={styles.tableText}>
                    {truck.description}
                </td>
                <td class={styles.ratingColumn}>
                    {starArray.length != 0 ? starArray.map(this.starHTML): "This Truck Has Not Been Rated"}
                </td>
                <td class={styles.buttonColumn}>
                    <button type="button" value={truck.truckId} class={styles.viewButton} onClick={this.viewTruck}>View</button>
                </td>
            </tr>
        ); 
    }
    
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#708090'}}>
                    <MenuBar/>
                    <div class="sections">
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Search</span>

                        <div style={{alignContent: 'center', marginLeft: '100px', maxHeight: 100, overflow: 'auto', width: '70%', display: 'flex', marginLeft: '15%'}}>
                            <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                <span id = "emailInput" style={{fontSize: '1.4rem', display: 'inline', marginLeft: '10px'}}>
                                    <form>
                                        <input type="text" placeholder="Search.." name="search" onChange={this.handleInputChange} value={this.state.search} style = {{padding: '6px', marginTop: '8px', fontSize: '17px', border: 'none'}}/>
                                        <button type="submit" style = {{float: 'right', padding: '6px', marginTop: '8px', background: '#a9a9a9', fontSize: '17px', cursor: 'pointer', border: 'none'}}>Submit</button>
                                    </form>
                                </span>
                            </div>
                        </div>

                    </div>

                    <div class={styles.tableDiv}>
                            <table class={styles.table}>
                                <thead class={styles.tableHeading}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Rating</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class={styles.tableBody}>
                                    {this.state.foodTrucksSearch.length != 0 ? this.state.foodTrucksSearch.map(this.renderTrucks) : null}
                                </tbody>
                            </table>
                    </div>

                    <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Recommended</span>
                    <div class={styles.tableDiv}>
                        <table class={styles.table}>
                            <thead class={styles.tableHeading}>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class={styles.tableBody}>
                                {this.state.foodTrucksRec.length != 0 ? this.state.foodTrucksRec.map(this.renderTrucks) : null}
                            </tbody>
                        </table>
                    </div>

                    <span id="nearby">
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Nearby</span>
                        <div class={styles.tableDiv}>
                            <table class={styles.table}>
                                <thead class={styles.tableHeading}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Rating</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class={styles.tableBody}>
                                    {this.state.nearbyTrucks.length != 0 ? this.state.nearbyTrucks.map(this.renderTrucks) : null}
                                </tbody>
                            </table>
                        </div>
                    </span>
                </body>
            </html>
        );
    }
}
export default Search;
