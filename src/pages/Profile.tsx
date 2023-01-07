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

    console.log("Profile");

        const { decodedToken, isExpired } = useJwt(currentUser);

    return (
        <div>
            <h2>Profile {currentUser}</h2>


            </div>

    );
}
