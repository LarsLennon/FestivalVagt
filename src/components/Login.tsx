import { FormEvent, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import './Login.css';
import AuthService from "../services/auth.service"
import { useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeUsername = (event: any) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event: any) => {
        setPassword(event.target.value)
    };

    const SubmitHandler = (event: any) => {
        event.preventDefault();
        console.log("SubmitHandler");
        setLoading(true);
        let response = AuthService.login(username, password).then(
            () => {
                setErrorMessage("");
                console.log("Response");
                navigate("/profile")
                // this.props.router.navigate("/profile");
                //   window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    

                console.log("AuthService error");
                console.log(error);

                setLoading(false);
                setErrorMessage(resMessage);
                setErrorMessage(error.response.data);
            }
        );



    };

    return (
        <div className="App">
            <h2>Login</h2>
            <Form className="form" onSubmit={SubmitHandler}>
                <FormGroup>
                    <Label for="exampleEmail">Memba medlemsnummer eller email</Label>
                    <Input
                        placeholder="example@example.com"
                        onChange={onChangeUsername}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        placeholder="********"
                        onChange={onChangePassword}
                    />
                </FormGroup>

                <FormGroup>{errorMessage != "" ? <Alert color="danger">{errorMessage}</Alert> : ""}</FormGroup>


                <Button
                    disabled={loading}>Submit</Button>
            </Form>
        </div>
    );
}
