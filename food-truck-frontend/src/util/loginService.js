import axios from "axios";

const USER_TOKEN = 'token'

class LoginService {

    doLogin(email, password) {
        const userDto = {
            emailAddress: email,
            password: password
        };
        console.log(userDto);
        return axios.post("https://food-truck-finder-group2.herokuapp.com:" + process.env.port + "/api/login", userDto) 
    }

    setToken(token) {
        sessionStorage.setItem(USER_TOKEN, token)
    }

    logout() {
        sessionStorage.removeItem(USER_TOKEN);
        window.location.href="/";
    }

    isUserLoggedIn() {
        let token = sessionStorage.getItem(USER_TOKEN)
        if (token === null) { return false }
        return true
    }
}

export default new LoginService();