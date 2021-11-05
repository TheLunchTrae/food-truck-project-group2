import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {email: '', password: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        const userDto = {
            emailAddress: this.state.email,
            password: this.state.password,
        };

        axios.post("http://localhost:8080/api/login", userDto).then((res) => {
            console.log(res.data);
            if(res.data.id != null){
                if(res.data.userType === "Customer"){
                    window.location.href = "/details?id=" + res.data.id;
                } else {
                    window.location.href = "/dashboard?id=" + res.data.id;
                }
            }
            
        })

        event.preventDefault()
       // window.location.href = "/search";
    }
    render() {
        return (
            <html>
                <body style = {{backgroundColor: '#FFDAB9'}}>
                    <div>
                        <div class="sections" >
                            <div class = "login" style = {{alignContent: 'center', borderRadius: '100px', background: '#FA8072', width: '30%', padding: '20px', margin: '35px auto', textAllign: 'center', border: '3px solid black'}}>
                                <form onSubmit={this.handleSubmit}>

                                    <span class="heading" style={{color: "#0F52BA", display: 'block', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold'}}>Login</span>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <span class = "email" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Email:</span>
                                        <span id = "emailInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                            <input name="email" pattern=".*@.*\..*" title="Must be in valid email format" placeholder="Enter an Email" value={this.state.email} type="text" onChange={this.handleInputChange}/>
                                        </span>
                                    </div>

                                    <div style = {{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <label>
                                            <span class = "password" style = {{fontSize: '1.4rem', fontWeight: 'bold', marginTop: '5px'}}>Password:</span>
                                        </label>
                                        <span id = "passwordInput" style={{fontSize: '1.4rem', marginLeft: '10px'}}>
                                        <input type="password" name="password" placeholder="Enter a password" value={this.state.password} onChange={this.handleInputChange}/>
                                        </span>
                                    </div>

                                    <br></br>

                                    <span style={{display: 'block', alignContent: 'center', margin: '0 auto', textAlign: 'center', padding: '5px 0'}}>
                                        <input type="submit" value="Login"/>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}
export default Login;
