import Axios from "axios";

class LoginService {
    login(email, password) {
        userDto = {
            emailAddress: email,
            password: password
        }

        return Axios.post("http://localhost:8080/api/login", userDto) 
    }

    setToken(email, token) {
        sessionStorage.setItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME, email);
        this.setupAxiosInterceptors(token);
    }

    setupAxiosInterceptors(token) {
        Axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()) {
                config.headers['userToken'] = token;
            }
            return config;
        })
    }
}

export default LoginService;