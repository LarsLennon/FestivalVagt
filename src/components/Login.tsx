import { Button, Card, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import './Login.css';


const SubmitHandler = () => {
    console.log("SubmitHandler");

};


export default function Login() {

    return (
        <div className="App">
            <h2>Login</h2>
            <Form className="form">
                <FormGroup>
                    <Label for="exampleEmail">Memba medlemsnummer eller email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="example@example.com"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}
