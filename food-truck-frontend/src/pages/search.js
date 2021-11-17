import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';
import MenuBar from '../menuBar';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucksRec: [], foodTrucksSearch: [], search: '' };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderRecommended = this.renderRecommended.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });

        Axios.get("http://localhost:8090/api/searchQuery/" + this.state.search, {
            headers: {
                'token': sessionStorage.getItem('token')
            }
            }).then(res => {
                console.log(res.data);
                const foodTrucks = res.data.map(obj => ({truckName: obj.truckName}));
                this.setState({ foodTrucksSearch: foodTrucks });
        });
    }
    handleSubmit(event) {
    }
    componentDidMount() {
        Axios.get("http://localhost:8090/api/search/recommended", {
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            const foodTrucks = res.data.map(obj => ({truckName: obj.truckName}));
            this.setState({ foodTrucksRec: foodTrucks });
        });
    }
    renderRecommended(index, key) {
        return <div key={key}>{this.state.foodTrucksRec[index].truckName}</div>;
    }
    renderSearch(index, key) {
        return <div key={key}>{this.state.foodTrucksSearch[index].truckName}</div>;
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
                        <MenuBar/>
                        <div class="sections">
                            <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                                <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Search</span>

                                <div style={{marginLeft: '100px', maxHeight: 100, overflow: 'auto', width: '70%', justifyContent: 'left', display: 'flex'}}>
                                    <ReactList itemRenderer = {this.renderRecommended} length={this.state.foodTrucksRec.length} type='uniform' />


                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span id = "emailInput" style={{fontSize: '1.4rem', display: 'inline', marginLeft: '10px'}}>
                                            <form>
                                                <input type="text" placeholder="Search.." onChange={this.handleInputChange} value={this.state.search} style = {{padding: '6px', marginTop: '8px', fontSize: '17px', border: 'none'}}/>
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
                                    <ReactList itemRenderer = {this.renderSearch} length={this.state.foodTrucksSearch.length} type='uniform' />
                                </div>

                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Search;
