import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';
import { MenuBar } from './index.js'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucksRec: [], foodTrucksSearch: [], search: '', listColor: 'white' };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderRecommended = this.renderRecommended.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTruckClick = this.handleTruckClick.bind(this);
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
    }
    renderRecommended(index, key) {
        return <div key={key} onClick={this.handleTruckClick} id={this.state.foodTrucksRec[index].truckId}>{this.state.foodTrucksRec[index].truckName}</div>;
    }
    renderSearch(index, key) {
        return <div key={key} onClick={this.handleTruckClick} id={this.state.foodTrucksSearch[index].truckId}>{this.state.foodTrucksSearch[index].truckName}</div>;
    }
    handleTruckClick(event) {
        console.log(event.target.id);
        window.location.href="/truckDetails?truckId=" + event.target.id;
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div class="sections">
                        <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                            <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Search</span>

                            <div style={{marginLeft: '100px', maxHeight: 100, overflow: 'auto', width: '70%', justifyContent: 'left', display: 'flex'}}>


                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <span id = "emailInput" style={{fontSize: '1.4rem', display: 'inline', marginLeft: '10px'}}>
                                        <form>
                                            <input type="text" placeholder="Search.." name="search" onChange={this.handleInputChange} value={this.state.search} style = {{padding: '6px', marginTop: '8px', fontSize: '17px', border: 'none'}}/>
                                            <button type="submit" style = {{float: 'right', padding: '6px', marginTop: '8px', marginRight: '16px', background: '#a9a9a9', fontSize: '17px', cursor: 'pointer', border: 'none'}}>Submit</button>
                                        </form>
                                    </span>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div class="sections">
                        <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                            <div style={{marginLeft: '100px', maxHeight: 100, overflow: 'auto', width: '70%', justifyContent: 'left', display: 'flex'}}>
                                <ReactList itemRenderer = {this.renderSearch} length={this.state.foodTrucksSearch.length} type='uniform'/>
                            </div>

                        </div>
                    </div>

                    <div class="sections">
                        <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                            <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Recommended</span>

                            <div style={{marginLeft: '100px', maxHeight: 100, overflow: 'auto', width: '70%', justifyContent: 'left', display: 'flex'}}>
                                <ReactList itemRenderer = {this.renderRecommended} length={this.state.foodTrucksRec.length} type='uniform' alignContent='center' />
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Search;
