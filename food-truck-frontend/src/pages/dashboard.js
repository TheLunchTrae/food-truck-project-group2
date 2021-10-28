import React, { Component } from 'react';


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
    }
    render() {
        return (
            <div>
                <div>
                    <h1 class = "heading">Dashboard</h1>
                    <p>Welcome to the Food Truck Finder Dashboard</p>
                </div>

                <div class = "sections">
                    <div class = "userSection">
                        <div class = "userImg"></div>
                        <span class = "userName">Joshua Hunter</span>
                        <span class = "userType">Food Truck Owner</span>  {/*THIS IS GOING TO BE THE TYPE OF USER THEY ARE LOGGED IN AS -->*/}
                    </div>
                </div>

                <table class = "foodTrucks">
                    <thead>
                        <tr>
                            <th>
                                FOOD TRUCK
                            </th>
                            <th>
                                TRUCK ID
                            </th>
                            <th>
                                RATING
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>TEST</td>
                            <td>TEST</td>
                            <td>TEST</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Dashboard;
