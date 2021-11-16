import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';
import MenuBar from '../menuBar';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucks: [] };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
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
            this.setState({ foodTrucks });
        });
    }
    itemRenderer(index, key) {
        return <div key={key}>{this.state.foodTrucks[index].truckName}</div>;
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
                                    <ReactList itemRenderer = {this.itemRenderer} length={this.state.foodTrucks.length} type='uniform' />
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
