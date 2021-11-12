import Axios from "axios";

const USER_TOKEN = 'token'

class LoginService {

    doLogin(email, password) {
        const userDto = {
            emailAddress: email,
            password: password
        };
        return Axios.post("http://localhost:8090/api/login", userDto) 
    }

    setToken(token) {
        sessionStorage.setItem(USER_TOKEN, token)
        this.setupAxiosInterceptors(token);
    }

    logout() {
        sessionStorage.removeItem(USER_TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_TOKEN)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_TOKEN)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        Axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()) {
                config.headers['token'] = token;
            }
            return config;
        })
    }
}

export default new LoginService();