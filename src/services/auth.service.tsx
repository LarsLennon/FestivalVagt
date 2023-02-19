import axios from "axios";
import { API_URL } from "./api.service";
 import jwt_decode from "jwt-decode";


// const url = "https://localhost:7217/api/Login";
const loginUrl = API_URL + "login";

interface jwtProps {
  name: string;
}

class AuthService {

  login(username: any, password: any) {
    return axios
      .post(loginUrl, {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          //const token = ;
          localStorage.setItem("token", response.data);
           var decoded: jwtProps = jwt_decode(response.data);
          // console.log(decoded);
          localStorage.setItem("username", decoded.name);
          console.log("Added token for " + decoded.name);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  isAuth() {
    if (localStorage.getItem("token") === null)
      return false;
    return true;
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  getCurrentUsername() {
    return localStorage.getItem('username');
  }
}

// export default new AuthService();

const authService = new AuthService();
export default authService;