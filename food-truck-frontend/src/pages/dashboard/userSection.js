import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', usertype: '', typePref: 'None', 
                        rangePref: 'None', ratingPref: 'None', pricePref: 'None',
                     editing: false
                    };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo", {
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                ['username']: res.data.userName,
                ['usertype']: res.data.userType
            });
        })
    }

    handleSubmit(event){
        event.preventDefault();
        if(event.target.id === 'prefs'){
            if(!this.state.editing){
                this.setState({
                    ['editing']: true
                });
            } else {
                const userPrefs = {
                    'foodType': document.getElementById('typeSelect').value,
                    'location': null,
                    'rating': document.getElementById('ratingSelect').value,
                    'pricePref': document.getElementById('priceSelect').value
                }
                axios.post("http://localhost:8090/api/dashboard/preferences", userPrefs, {
                    headers: {
                        'userId': sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                })
                this.setState({
                    ['editing']: false
                });
            }
        } else if(event.target.id === 'drop'){
            //document.getElementById("typesDropdown").classList.toggle("show");
        }
        
    }

    renderEdit(){
        return(
            <div class={styles.parent}>
                <span style={{ textAlign: 'center' }}>
                    <form id="prefs" onSubmit={this.handleSubmit}>
                        <button type="submit" id="editButton" class={styles.editButton}>
                            Save Preferences
                        </button>
                    </form>
                </span>
                <table class={styles.prefTableE}>
                    <tbody>
                        <tr>
                            {/* Food Type Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Food Type:
                                </span>
                            </td>
                            <td> 
                                <span class ={styles.prefChoice} name="ratingPref">
                                    <select class={styles.dropdown} id="ratingSelect"> 
                                        <option value="null">None</option>
                                        <option value="American">American</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="TexMex">TexMex</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="Thai">Thai</option>
                                    </select>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Location Preference*/}
                            <td>
                                <span class= {styles.prefHead}>
                                    Truck Range:
                                </span>
                            </td>
                            <td>
                                <span class = {styles.prefChoice} name="rangePref">
                                    <select class={styles.dropdown} id="rangeSelect">
                                        <option value="null">None</option>
                                        <option value="5">5 Miles</option>
                                        <option value="10">10 Miles</option>
                                        <option value="25">25 Miles</option>
                                    </select>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Rating Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Minimum Rating:
                                </span>
                            </td>
                            <td>
                                <span class ={styles.prefChoice} name="ratingPref">
                                    <select class={styles.dropdown} id="ratingSelect"> 
                                        <option value="null">None</option>
                                        <option value="5">***** (5)</option>
                                        <option value="4">**** (4)</option>
                                        <option value="3">*** (3)</option>
                                        <option value="2">** (2)</option>
                                        <option value="1">* (1)</option>
                                    </select>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Price Range Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Price Range:
                                </span>
                            </td>
                            <td>                       
                                <span class ={styles.prefBody} name="pricePref">
                                    <select class={styles.dropdown} id="priceSelect">    
                                        <option value="null">None</option>
                                        <option value="Average < $5">Less Than $5</option>
                                        <option value="Average $5-$10">$5 - $10</option>
                                        <option value="Average $10+">$10+</option>
                                    </select>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

   

    renderDisplay(){
        return ( 
            <div class={styles.parent}>
                <span style={{ textAlign: 'center' }}>
                    <form id="prefs" onSubmit={this.handleSubmit}>
                        <button type="submit" id="editButton" class={styles.editButton}>
                            Edit Preferences
                        </button>
                    </form>
                </span>
                <table class={styles.prefTableD}>
                    <tbody>
                        <tr>
                            {/* Food Type Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Food Type:
                                </span>
                            </td>
                            <td>
                                <span class = {styles.prefBody}>
                                    {this.state.typePref}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Location Preference*/}
                            <td>
                                <span class= {styles.prefHead}>
                                    Truck Range:
                                </span>
                            </td>
                            <td>
                                <span class = {styles.prefBody}>
                                    {this.state.rangePref}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Rating Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Minimum Rating:
                                </span>
                            </td>
                            <td>
                                <span class ={styles.prefBody} >
                                    {this.state.ratingPref}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            {/* Price Range Preference*/}
                            <td>
                                <span class={styles.prefHead}>
                                    Price Range:
                                </span>
                            </td>
                            <td>                       
                                <span class ={styles.prefBody}>
                                    {this.state.pricePref}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    isEditing(){
        if(this.state.editing){
            return this.renderEdit();
        }
        return this.renderDisplay();
    }

    render(){
        return (
            <div>
                <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>
                    { this.state.username }
                </span>
                <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>
                    {this.state.usertype}
                </span>
                <hr style = {{border: '1px solid black', width: '75%'}}></hr>
                <span class = "userPrefs" style = {{float: 'center', width: '90%', color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}>
                    {this.isEditing()}
                </span>
            </div>
        );
    }
}

export default UserSection;