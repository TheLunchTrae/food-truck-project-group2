import Axios from 'axios';
import React, { Component } from 'react';
import ReactList from 'react-list';

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
            this.setState({ foodTrucks: res.data.name });
        });
    }
    itemRenderer(index, key) {
        return <div key={key}>{this.state.foodTrucks[index].name}</div>;
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
                        <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                            <div class="navigation" style = {{height: '60px'}}>
                                  <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                                    Food Truck Finder
                                  </a>
                                 <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                                    <a href = "\signup" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Sign Up</a>
                                    <a href = "\login" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Log In</a>
                                    <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                                    <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>
                                    <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                                </nav>
                            </div>
                        </div>

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
