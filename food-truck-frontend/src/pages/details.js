import React, { Component } from 'react';
import './_app.js'

class Dashboard extends Component {
    constructor(props) {
        super();
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {
    }
    componentDidMount() {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        console.log(id);
    }
    render() {
        return (
            <div>
                <h1>
                    Test
                </h1>
            </div>
        
        );
    }
}
export default Dashboard;
