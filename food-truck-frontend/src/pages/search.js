import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';
import { MenuBar } from './index.js'
import styles from './signup.module.scss';
import styles2 from './search.module.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucksRec: [], foodTrucksSearch: [], search: '', listColor: 'white', nearbyTrucks: [] };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderRecommended = this.renderRecommended.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTruckClick = this.handleTruckClick.bind(this);
        this.renderNearby = this.renderNearby.bind(this);
    }
    handleChangeStatus(event) {
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
                    const foodTrucks = res.data.map(obj => ({truckName: obj.truckName, truckId: obj.truckId}));
                    this.setState({ foodTrucksSearch: foodTrucks });
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
                    const foodTrucks = res.data.map(obj => ({truckName: obj.truckName, truckId: obj.truckId}));
                    this.setState({ foodTrucksSearch: foodTrucks });
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
            const foodTrucks = res.data.map(obj => ({truckName: obj.truckName, truckId: obj.truckId}));
            this.setState({ foodTrucksRec: foodTrucks });
        });
        Axios.post("http://localhost:8090/api/map/nearestTrucks", null, {
            headers: {
                'userId': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            const foodTrucks = res.data.map(obj => ({truckName: obj.truckName, truckId: obj.truckId}));
            this.setState({ nearbyTrucks: foodTrucks });
        });
    }
    renderRecommended(index, key) {
        return <div key={key} onClick={this.handleTruckClick} id={this.state.foodTrucksRec[index].truckId}>{this.state.foodTrucksRec[index].truckName}</div>;
    }
    renderSearch(index, key) {
        return <div key={key} onClick={this.handleTruckClick} id={this.state.foodTrucksSearch[index].truckId}>{this.state.foodTrucksSearch[index].truckName}</div>;
    }
    renderNearby(index, key) {
        return <div key={key} onClick={this.handleTruckClick} id={this.state.nearbyTrucks[index].truckId}>{this.state.nearbyTrucks[index].truckName}</div>;
    }
    handleTruckClick(event) {
        console.log(event.target.id);
        window.location.href="/truckDetails?truckId=" + event.target.id;
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

                    
                    <div class="sections">
                        <div class = "block" style = {{height: '200px', alignContent: 'center', background: '#FFFFFF', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center'}}>

                            <div style={{height: '200px', fontSize: '1.0rem', textAlign: 'center', fontWeight: 'bold', maxHeight: '100%', overflow: 'auto', width:'100%' }}>
                                <ReactList class={styles2.reactList} itemRenderer = {this.renderSearch} length={this.state.foodTrucksSearch.length} type='uniform'/>
                            </div>
                        </div>
                    </div>

                    <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Recommended</span>
                    <div class="sections">
                        <div class = "block" style = {{height: '200px', alignContent: 'center', background: '#FFFFFF', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center'}}>

                            <div style={{height: '200px', fontSize: '1.0rem', textAlign: 'center', fontWeight: 'bold', maxHeight: '100%', overflow: 'auto', width:'100%' }}>
                                <ReactList class={styles2.reactList} itemRenderer = {this.renderRecommended} length={this.state.foodTrucksRec.length} type='uniform' alignContent='center' />
                            </div>
                        </div>
                    </div>

                    <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Nearby</span>
                    <div class="sections">
                        <div class = "block" style = {{height: '200px', alignContent: 'center', background: '#FFFFFF', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center'}}>

                            <div style={{height: '200px', fontSize: '1.0rem', textAlign: 'center', fontWeight: 'bold', maxHeight: '100%', overflow: 'auto', width:'100%' }}>
                                <ReactList class={styles2.reactList} itemRenderer = {this.renderNearby} length={this.state.nearbyTrucks.length} type='uniform' alignContent='center' />
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Search;
