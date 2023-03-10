import axios from "axios";
import { useJwt } from "react-jwt";
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";


const API_URL = "http://localhost:72871/api/";

const url = "https://localhost:7217/api/Login";

interface jwtProps {
  name: string;
}

class AuthService {

  login(username: any, password: any) {
    return axios
      .post(url, {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          //const token = ;
          localStorage.setItem("token", response.data);
          var decoded: jwtProps = jwt_decode(response.data);
          console.log("Added token");
          console.log(decoded);
          localStorage.setItem("username", decoded.name);
        }

        console.log(response);
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

export default new AuthService();