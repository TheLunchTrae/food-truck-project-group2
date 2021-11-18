import React, { Component } from 'react';
import axios from 'axios';
import MenuBar from '../menuBar';

class About extends Component {
    constructor(props) {
        super();
        this.state = { userId: '', truckId: -1, truckName: '', route: [], schedule: '', menu: '', description: '', ratings: [], ratingValue: '', ratingReview: ''};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubscribeSubmit = this.handleSubscribeSubmit.bind(this);
        this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    handleSubscribeSubmit(event) {


        const val = axios.post("http://localhost:8090/api/subscribe/" + this.state.truckId, {}, {headers:{'userId': this.state.userId}}).then(res => {
            console.log(res);
        });
        if (val != null)
            alert("Subscription successful")

        event.preventDefault()
    }

    handleRatingSubmit(event){
        const Rating = {
            userId: this.state.userId,
            value: this.state.ratingValue,
            review: this.state.ratingReview
        };

        const val = axios.post("http://localhost:8090/api/addRating/", Rating, {headers:{'truckId': this.state.truckId}}).then(res => {
            console.log(res);
        });
        if (val != null)
            alert("Rating add successful")

        event.preventDefault()

    }

    componentDidMount(){
        // get the truck id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const truckId = urlParams.get('truckId');
        this.state.truckId = truckId;
        console.log(this.state.truckId);
        if (truckId != null){
            axios.get("http://localhost:8090/api/getTruck/" + this.state.truckId).then(res => {
                console.log(res);
                this.setState({
                    truckId: res.data.truckId,
                    truckName: res.data.truckName,
                    route: res.data.route,
                    schedule: res.data.schedule,
                    menu: res.data.menu,
                    description: res.data.description,
                    ratings: res.data.ratings
                });
            });
        } else {

        }

    }

    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#90AACB'}}>
                    <MenuBar/>
                    <div style={{fontWeight: '500'}}>
                        <h1 class = "heading" style = {{marginBottom: '0px', fontSize: '2.3rem', color: '#000000'}}>{this.state.truckName}</h1>
                        <p style = {{marginTop: '0px', fontSize: '1.3rem', color: '#FFFFFF'}}>{this.state.truckId}</p>
                    </div>

                    <div class="sections" >


                        <div class = "block" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>

                            <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Truck Details</span>

                            <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                <label>
                                    <span class = "ratingPref" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Rating Preference:</span>
                                </label>
                                <span id = "foodLocInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                    <select name="usertype">
                                        <option value="" selected disabled hidden>N/A</option>
                                        <option value="1">***** (5)</option>
                                        <option value="2">**** (4)</option>
                                        <option value="3">*** (3)</option>
                                        <option value="4">** (2)</option>
                                        <option value="5">* (1)</option>
                                    </select>
                                </span>

                                <label>
                                    <span class = "description" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Description: </span>
                                </label>
                                <span class = "schedule" style = {{color: '#000000', fontSize: '1.0rem', marginTop: '5px'}}>{this.state.description}</span>
                                
                                <label>
                                    <span class = "schedule" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Schedule: </span>
                                </label>
                                <span class = "schedule" style = {{color: '#000000', fontSize: '1.0rem', marginTop: '5px'}}>{this.state.schedule}</span>

                                <label>
                                    <span class = "route" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Route: </span>
                                </label>
                                <tbody style = {{color: '#000000', fontSize: '1.2rem'}}>
                                    {this.state.route.map(location => (
                                        <tr>
                                            <td>{location["xcoordinate"]}</td>
                                            <td>{location["ycoordinate"]}</td>                            
                                        </tr>
                                    ))}
                                </tbody>

                                <label>
                                    <span class = "ratings" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Ratings: </span>
                                </label>

                                <table>
                                    <thead style = {{color: '#0F52BA', fontSize: '1.5rem'}}>
                                        <tr>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                USER ID
                                            </th>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                VALUE
                                            </th>
                                            <th style = {{height: '50px', width: '200px'}}>
                                                REVIEW
                                            </th>
                                        </tr>                                        
                                    </thead>
                                    <tbody style = {{color: '#000000', fontSize: '1.2rem'}}>
                                        {this.state.ratings.map(location => (
                                            <tr>
                                                <td>{location["userId"]}</td>
                                                <td>{location["value"]}</td>  
                                                <td>{location["review"]}</td>                           
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <form id = "subscribe" onSubmit={this.handleSubscribeSubmit}>
                                    <span id = "userId" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input name="userId" placeholder="Enter ID of user who is subscribing (TODO remove)" value={this.state.userId} type="text" onChange={this.handleInputChange}/>
                                    </span>
                                    <button type="submit">Subscribe</button>
                                </form>

                                <form id = "rating" onSubmit={this.handleRatingSubmit}>
                                    
                                    <span class = "userid" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>User Id:</span>
                                    <span id = "userId" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input name="userId" placeholder="Enter ID of user who is rating (TODO remove)" value={this.state.userId} type="text" onChange={this.handleInputChange}/>
                                    </span>

                                    <span class = "value" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>Rating value:</span>
                                    <span id = "ratingValue" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input name="ratingValue" placeholder="Enter rating value (1-5)" pattern= "[1-5]" title="Must be 1-5" value={this.state.ratingValue} type="text" onChange={this.handleInputChange}/>
                                    </span>
                                    
                                    <span class = "review" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>Review (optional):</span>
                                        <span id = "ratingReview" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input name="ratingReview" placeholder="Enter review" value={this.state.ratingReview} type="text" onChange={this.handleInputChange}/>
                                    </span>
                                    <button type="submit">Leave Rating</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default About;
