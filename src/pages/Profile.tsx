import { FormEvent, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import { useJwt } from "react-jwt";
import AuthService from "../services/auth.service"
import { useNavigate } from "react-router-dom";


interface IFooBar {
  username?: string;
}
export default function Profile() {
  const navigate = useNavigate();

    const currentUser = AuthService.getCurrentUsername() as string;

  // if(currentUser == "") {
  //   navigate("/login");
  // }
    console.log("Profile");

        const { decodedToken, isExpired } = useJwt(currentUser);
        //console.log(isExpired);
        //console.log(decodedToken);
        // const test =  decodedToken as IFooBar;

        // console.log(test);
        // if(test.username != null) {
        //   console.log(test.username ? "1" : "0");
        // }
         
    /*
      If is a valid jwt, 'decodedToken' will be a object
      it could look like:
      {
        "name": "Gustavo",
        "iat": 1596408259,
        "exp": 4752168259
      }
  
      'isExpired' will return a boolean
      true => your token is expired
      false => your token is not expired
    */
    return (
        <div>
            <h2>Profile {currentUser}</h2>


            </div>

    );
}
