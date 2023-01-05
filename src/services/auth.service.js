import axios from "axios";
import { useJwt } from "react-jwt";
import jwt_decode from "jwt-decode";


const API_URL = "http://localhost:72871/api/";

const url = "https://localhost:44335/api/Login";

class AuthService {

  login(username:any, password:any) {
    return axios
      .post(url, {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          //const token = ;
          localStorage.setItem("token", response.data);
          var decoded = jwt_decode(response.data);
          console.log("Added token");
          console.log(decoded);
          localStorage.setItem("username", decoded.username);
        }

        console.log(response);
        return response.data;
      });
  }
  
  getCurrentUser() {
    return localStorage.getItem('token');
  }
  
  getCurrentUsername() {
    return localStorage.getItem('username');
  }
}

export default new AuthService();