import React, { Component } from 'react';
import axios from 'axios';
import { MenuBar } from './index.js';
import styles from './signup.module.scss';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = { truckId: -1, truckName: '', route: [], schedule: '', menu: '', description: '', ratings: [], ratingValue: '', ratingReview: '', isSubscribed: false };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubscribeSubmit = this.handleSubscribeSubmit.bind(this);
        this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
        this.handleUnsubscribeSubmit = this.handleUnsubscribeSubmit.bind(this);
        this.renderSubButton = this.renderSubButton.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    handleSubscribeSubmit(event) {
        console.log(sessionStorage.getItem('token'));
        axios.get("http://localhost:8090/api/subscribe/" + this.state.truckId, {
            headers:{
                'userId': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res);
        });

        event.preventDefault();
        window.location.href = "/truckDetails?truckId=" + this.state.truckId;
    }

    handleUnsubscribeSubmit(event) {
        console.log(sessionStorage.getItem('token'));
        axios.get("http://localhost:8090/api/unsubscribe/" + this.state.truckId, {
            headers:{
                'userId': sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res);
        });

        event.preventDefault();
        window.location.href = "/truckDetails?truckId=" + this.state.truckId;
    }

    handleRatingSubmit(event){
        const userId = sessionStorage.getItem('token');
        const Rating = {
            userId: userId,
            value: this.state.ratingValue,
            review: this.state.ratingReview
        };

         axios.post("http://localhost:8090/api/addRating/", Rating, {headers:{'truckId': this.state.truckId}}).then(res => {
            console.log(res);
        });

        event.preventDefault();
        window.location.href = "/truckDetails?truckId=" + this.state.truckId;
    }

    renderSubButton() {
        if (this.state.isSubscribed) {
            return (
                <form id = "subscribe" onSubmit={this.handleUnsubscribeSubmit}>
                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                        <button type="submit" style = {{background: '#a9a9a9', fontSize: '17px', cursor: 'pointer'}}>Unsubscribe</button>
                    </div>
                </form>
            );
        } else {
            return (
                <form id = "subscribe" onSubmit={this.handleSubscribeSubmit}>
                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                        <button type="submit" style = {{background: '#a9a9a9', fontSize: '17px', cursor: 'pointer'}}>Subscribe</button>
                    </div>
                </form>
            );
        }
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

            // set the subscribed state
            axios.get("http://localhost:8090/api/user/isSubscribed/" + this.state.truckId, {
                headers:{ 'token': sessionStorage.getItem('token') }
            }).then(res => {
                console.log(res);
                this.setState({ isSubscribed: res.data });
            });
        } else {
            document.getElementById("id");
        }
    }

    render() {
        return (
            <body style = {{backgroundColor: '#708090'}}>
                <MenuBar/>
                <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '20px'}}>Truck Page</span>
                <div class="sections" >
                    <div class = "headerText" style = {{alignContent: 'center', background: '#FFFFFF', width: '40%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>{this.state.truckName}</span>
                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                            {this.renderSubButton()}
                        </div>
                    </div>


                    <div class = "block" style = {{alignContent: 'center', background: '#FFFFFF', width: '50%', padding: '20px', margin: '35px auto', textAllign: 'center'}}>

                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px'}}><u>Truck Details</u></span>

                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                            <label>
                                <span class = "ratingPref" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Rating Preference:</span>
                            </label>
                            <span id = "foodLocInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                    <select name="ratingType">
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
                            <span class="schedule" style={{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '20px', color: '#0F52BA'}}>{this.state.description}</span>
                        </div>

                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                            <label>
                                <span class = "schedule" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Schedule: </span>
                            </label>
                            <span class="schedule" style={{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '20px', color: '#0F52BA'}}>{this.state.schedule}</span>
                        </div>

                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                            <label>
                                <span class = "route" style = {{color: '#000000', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Route: </span>
                            </label>
                            <tbody style = {{color: '#0F52BA', fontSize: '1.4rem', fontWeight: 'bold'}}>
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
                                            USER ID
                                        </th>
                                        <th style = {{height: '50px', width: '200px'}}>
                                            RATING
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

                    </div>

                    <div class = "block" style = {{alignContent: 'center', width: '30%', padding: '20px', background: '#FFFFFF', margin: '35px auto'}}>
                        <span class="heading" style={{color: "#000000", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Leave a Review!</span>
                        <br></br>
                        <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', padding: '5px 0'}}>

                        <form id = "rating" onSubmit={this.handleRatingSubmit}>

                            <div class={styles.formnput}>
                                <input id="ratingValue" name="ratingValue" class={styles.formelementinput} type="text" placeholder="Enter rating value (1-5)" pattern= "[1-5]" title="Must be 1-5" value={this.state.ratingValue} required onChange={this.handleInputChange}/>
                                <div class={styles.formelementbar}></div>
                                <label class={styles.formelementlabel} for="ratingValue">Rating Value</label>
                            </div>

                            <div class={styles.formnput}>
                                <input id="ratingReview" name="ratingReview" class={styles.formelementinput} placeholder="Enter review" type="text" value={this.state.ratingReview} required onChange={this.handleInputChange}/>
                                <div class={styles.formelementbar}></div>
                                <label class={styles.formelementlabel} for="revie">Review</label>
                            </div>

                            <div style = {{display: 'block', margin: '0 auto', alignContent: 'center', textAlign: 'center', padding: '5px 0'}}>
                                <button type="submit" style = {{fontSize: '17px', cursor: 'pointer', background: '#708090'}}>Leave Rating</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </body>
        );
    }
}
export default About;