import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import './css/Login.css';
import authService from "../services/auth.service"
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/GlobalContent";



export default function Login() {
    const { setUserName } = useGlobalContext()
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

    const handleDummyLogin = (user: string) => {
        setLoading(true);
        authService.login(user, "1234").then(
            () => {
                setErrorMessage("");
                console.log("Response");
                navigate("/calendar")
                //setSectionId("222");
                setUserName(authService.getCurrentUsername()!);
                console.log(authService.getCurrentUsername());
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

    const SubmitHandler = (event: any) => {
        event.preventDefault();
        console.log("SubmitHandler");
        handleLogin();
    };

    const handleLogin = () => {
        setLoading(true);
        authService.login(username, password).then(
            () => {
                setErrorMessage("");
                console.log("Response");
                navigate("/calendar")
                // this.props.router.navigate("/profile");
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
            {process.env.NODE_ENV !== "development" ? "" :
                <div>
                    <Button onClick={() => handleDummyLogin("l@rslennon.dk")}>Login Lars</Button>
                    <Button onClick={() => handleDummyLogin("Janne@smukfest.dk")}>Login Janne</Button>
                    <Button onClick={() => handleDummyLogin("all.rasmussen@gmail.com")}>Login Allan</Button>
                    <Button onClick={() => handleDummyLogin("klaes8660@gmail.com")}>Login Klaes</Button>
                </div>
            }

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

                <FormGroup>{errorMessage !== "" ? <Alert color="danger">{errorMessage}</Alert> : ""}</FormGroup>


                <Button disabled={loading}>Submit</Button>
            </Form>
        </div>
    );
}
