import React, { Component } from 'react';
import axios from 'axios';
import styles from './userSection.module.scss';

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', usertype: '', typePref: 'None', 
                        locPref: 'None',ratingPref: 'None', pricePref: 'None',
                        editing: false };
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

    componentDidUpdate(prevProps){
        document.getElementById('editButton').addEventListener(this.changeEdit);
    }

    changeEdit(){
        console.log("HERE FOR FUN");
        if(this.editing){
             //axios post goes here
        }
    }

    renderEdit(){
        return(
            <div class={styles.parent}>
                <span style={{ textAlign: 'center' }}>
                    <button value="Save Preferences" id="editButton" class={styles.editButton}/>
                </span>
                <table class={styles.prefTableD}>
                    <tr>
                        {/* Food Type Preference*/}
                        <td>
                            <span class={styles.prefHead}>
                                Food Type:
                            </span>
                        </td>
                        <td>
                            <span class={styles.prefBody} name="typePref">
                                {this.state.typePref}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        {/* Location Preference*/}
                        <td>
                            <span class= {styles.prefHead}>
                                Truck Location:
                            </span>
                        </td>
                        <td>
                            <span class = {styles.prefBody} name="locProf">
                                {this.state.locPref}
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
                            <span class ={styles.prefBody} name="ratingPref">
                                <select class={styles.dropdown} name="ratingSelect">
                                    <option value="american">American</option>
                                    <option value="mexican">Mexican</option>
                                    <option value="indian">Indian</option>
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
                                {this.state.pricePref}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    renderDisplay(){
        return ( 
            <div class={styles.parent}>
                <span style={{ textAlign: 'center' }}>
                    <form onSubmit={this.changeEdit}>
                        <button type="submit" class={styles.editButton}>
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
                                    Truck Location:
                                </span>
                            </td>
                            <td>
                                <span class = {styles.prefBody}>
                                    {this.state.locPref}
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