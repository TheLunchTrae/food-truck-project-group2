import React, { Component } from 'react';
import ReactList from 'react-list';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { foodTrucks: [] };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {
    }
    componentWillMount() {
        this.state.foodTrucks = [{score: 7}, {score: 1}, {score: 8}, {score: 7}, {score: 10}, {score: 5}, {score: 4}, {score: 3}, {score: 2}, {score: 9}];
        this.state.foodTrucks.sort(function(a, b) {return a.score - b.score});
    }
    componentDidMount() {
    }
    itemRenderer(index, key) {
        return <div key={key}>{this.state.foodTrucks[index].score}</div>;
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <div>
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
