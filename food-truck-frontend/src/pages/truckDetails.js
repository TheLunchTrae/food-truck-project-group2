import React, { Component } from 'react';
import axios from 'axios';

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
                    <div name="menuBar" class="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>
                        <div className="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                            <div className="navigation" style = {{height: '60px'}}>
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

                        <div class="sections" >

                            <div class = "headerText" style = {{alignContent: 'center', borderRadius: '100px', background: '#F9D5A7', width: '35%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                                <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>{this.state.truckName}Truck</span>
                                <span class = "ratingPref" style = {{color: '#000000', display: 'block', fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center'}}>ID: {this.state.truckId}</span>
                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <form id = "subscribe" onSubmit={this.handleSubscribeSubmit}>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <button type="submit" style = {{background: '#a9a9a9', fontSize: '17px', cursor: 'pointer'}}>Subscribe</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


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
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <label>
                                        <span class = "description" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Description: </span>
                                    </label>
                                    <span class = "schedule" style = {{color: '#000000', fontSize: '1.0rem', marginTop: '5px'}}>{this.state.description}</span>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <label>
                                        <span class = "schedule" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Schedule: </span>
                                    </label>
                                    <span class = "schedule" style = {{color: '#000000', fontSize: '1.0rem', marginTop: '5px'}}>{this.state.schedule}</span>
                                </div>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
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
                                </div>

                                <hr style = {{border: '1px solid black', width: '85%', marginTop: '15px'}}></hr>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                    <label>
                                        <span class = "ratings" style = {{color: '#000000', fontSize: '1.7rem', fontWeight: 'bold', marginTop: '5px'}}><u>Ratings</u></span>
                                    </label>
                                </div>

                                <div>
                                    <table style = {{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                                        <thead style = {{color: '#0F52BA', fontSize: '1.5rem'}}>
                                            <tr>
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
                                </div>

                                <hr style = {{border: '1px solid black', width: '85%', marginTop: '15px', marginBottom: '15px'}}></hr>

                                <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>

                                    <form id = "rating" onSubmit={this.handleRatingSubmit}>
                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "value" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>Rating value:</span>
                                            <span id = "ratingValue" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                                <input name="ratingValue" placeholder="Enter rating value (1-5)" pattern= "[1-5]" title="Must be 1-5" value={this.state.ratingValue} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <span class = "review" style = {{fontSize: '1.0rem', fontWeight: 'bold', marginTop: '5px'}}>Review (optional):</span>
                                             <span id = "ratingReview" style={{fontSize: '1.4rem'}}>
                                                <input style = {{width: '600px', height: '20px'}} name="ratingReview" placeholder="Enter review" value={this.state.ratingReview} type="text" onChange={this.handleInputChange}/>
                                            </span>
                                        </div>

                                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                            <button type="submit">Leave Rating</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default About;
