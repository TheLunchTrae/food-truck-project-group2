import React, { Component } from 'react';
import axios from 'axios';

class UserSection extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', usertype: '', typePref: '', locPref: '', ratingPref: '', pricePref: '', editing: false}
    }

    isEditing(){
        if(this.state.editing){
            return renderEdit();
        }
        return renderDisplay();
    }

    componentDidMount(){
        axios.get("http://localhost:8090/api/userinfo", {
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                ['username']: res.data.userName
            });
        })
    }

    render(){
        return (
            <div class = "userSection" style = {{float: 'left', borderRadius: '100px', background: '#F9D5A7', width: '25%', padding: '20px', display: 'inline-block', border: '3px solid black'}}>
                <div>
                    <span style = {{height: '100px', width: '100px', background: '#bbbbbb', borderRadius: '50%', display: 'block', zIndex: '99', margin: '0 auto'}}></span>
                    <span class = "userName" style = {{color: '#0F52BA', display: 'block', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginTop: '5px'}}>{ this.state.username }</span>
                    <span class = "userType" style = {{color: '#002366', display: 'block', fontSize: '1.1rem', textAlign: 'center'}}>
                        {this.state.usertype}
                    </span>
                    <hr style = {{border: '1px solid black', width: '75%'}}></hr>

                    <span class = "userType" style = {{color: '#0F52BA', display: 'block', fontSize: '1.1rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold'}}><u>Preference Modification</u></span>
                    
                   
                </div>
            </div>
        )
    }
}

export default UserSection;