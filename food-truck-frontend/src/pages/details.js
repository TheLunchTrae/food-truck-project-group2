import { HighlightSharp } from '@material-ui/icons';
import React, { Component } from 'react';
import './_app.js'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '' };
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {
    }
    componentDidMount() {
        // get gets the id from the url
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        console.log(id);
        this.setState({ id: id });
    }
    render() {
        return (
            <div>
                <h1>
                    Hello, {this.state.id}!
                </h1>
            </div>
        
        );
    }
}
export default Dashboard;
