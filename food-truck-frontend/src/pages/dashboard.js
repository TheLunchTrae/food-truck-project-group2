import React, { Component } from 'react';
import './_app.js'
import Axios from 'axios';
import { FormatAlignLeftRounded } from '@material-ui/icons';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', foodTruckData: [] };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleChangeStatus(event) {
    }
    handleInputChange(event) {
    }
    handleSubmit(event) {
    }
    componentDidMount() {

        // gets the id from the url and sets it to the state
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        var ownerName;
        if(id != null) {
            //First get owner's name from details
            Axios.get("http://localhost:8090/api/details/" + id).then(res => {
                console.log(res);
                //this.setState({ name: res.data });
                ownerName = res.data;
            })
            //Then get food truck data via dashbord data
            Axios.get("http://localhost:8090/api/dashboard/" + id).then(res => {
                console.log(res);

                var dashboardData = res.data;
                //alert(res.data.foodTrucks[0]["truckName"]);
                var str = " ";
                str += dashboardData["subscriptions"] + ' ';
                str += dashboardData["ratings"] + ' ';
                //ftd = dashboardData.foodTrucks;
                var ftdata = dashboardData.foodTrucks;
                for (var i = 0; i < ftdata.length; i++){
                    str += ftdata[i]["truckId"] + ' ';
                    str += ftdata[i]["truckName"] + ' ';
                    str += ftdata[i]["ownerId"] + ' ';
                    str += ftdata[i]["route"] + ' ';
                    str += ftdata[i]["schedule"] + ' ';
                    str += ftdata[i]["menu"] + ' ';
                    str += ftdata[i]["description"] + ' ';
                    str += ftdata[i]["ownerId"] + ' ';
                }
                //alert(str);

                this.setState({name: ownerName, foodTruckData: ftdata});
            })
            
        }
        else {
            this.setState({name: "USER_NAME", foodTruckData: []});
        }
    }
    renderNotifications(){}
    renderSubsctions(){}    /*Should technically only be in details but oh well*/
    //TODO - add some other stuff later
    renderFoodTrucks(){
        /*
        if (foodTruckData == undefined){
            return "FoodTruckData is undefined!!";
        }
        */
        //Food truck name + link
        //Food truck ID
        //Rating
        let htmldata = "";//"<tbody style = {{color: '#FFFFFF', fontSize: '1.2rem'}}>";
        var ftdata = this.state.foodTruckData;
        for (var i = 0; i < ftdata.length; i++){
            var truckName = ftdata[i]["truckName"];
            var truckId = ftdata[i]["truckId"];
            var rating = "PLACEHOLDER_RATING";
            htmldata += "<tr><td>"+truckName+"</td><td>"+truckId+"</td><td>"+rating+"</td></tr>";
        }
        //htmldata += "</tbody>";
        return htmldata;
    }
    myURL(id){
        return "\editTruck?id="+id
    }
    render() {
        return (
        <html>
            <body style = {{backgroundColor: '#FFDAB9', marginLeft: '35px'}}>
                <div>
                    <div style={{fontWeight: '500'}}>
                        <h1 class = "heading" style = {{marginBottom: '0px', fontSize: '2.3rem', color: '#0F52BA'}}>Dashboard</h1>
                        <p style = {{marginTop: '0px', fontSize: '1.3rem', color: '#002366'}}>Welcome to the Food Truck Finder Dashboard!</p>
                    </div>

                    <div class = "sections">
                        <div class = "userSection" style = {{float: 'left', borderRadius: '100px', background: '#FA8072', width: '25%', padding: '20px', display: 'inline-block', border: '3px solid black'}}>
                            <div>
                                <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                                <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>{ this.state.name }</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>Food Truck Owner</span>  {/*THIS IS GOING TO BE THE TYPE OF USER THEY ARE LOGGED IN AS -->*/}
                                <hr style = {{border: '1px solid black', width: '75%'}}></hr>
                                <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Notifications</u></span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification1</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification2</span>
                                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1rem', textAlign: 'center', margin: '20px 0'}}>Notification3</span>
                            </div>
                        </div>

                        <div class = "tableSection" style = {{marginLeft: '55px', float: 'left', borderRadius: '100px', background: '#FA8072', width: '65%', padding: '15px', display: 'inline-block', border: '3px solid black'}}>

                            <span class = "userName" style = {{color: '#000000', display: 'block', fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}><u>Your Trucks</u></span>

                            <table class = "foodTrucks" style = {{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                                <thead style = {{color: '#0F52BA', fontSize: '1.5rem'}}>
                                    <tr>
                                        <th style = {{height: '50px', width: '200px'}}>
                                            FOOD TRUCK
                                        </th>
                                        <th style = {{height: '50px', width: '200px'}}>
                                            TRUCK ID
                                        </th>
                                        <th style = {{height: '50px', width: '200px'}}>
                                            RATING
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style = {{color: '#FFFFFF', fontSize: '1.2rem'}}>
                                    {this.state.foodTruckData.map(ft => (
                                        <tr>
                                            <td>
                                                <a href = {this.myURL(ft["truckId"])}>{ft["truckName"]}</a>                                                
                                            </td>
                                            <td>{ft["truckId"]}</td>
                                            <td>PLACEHOLDER_RATING</td>                                        
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        );
    }
}
export default Dashboard;
