import { Alert, Container } from "reactstrap";

export default function Unauthorized() {
    return (
        <Container>
            <Alert color="danger"><h3>Du har ikke adgang til denne side!</h3></Alert>
        </Container>
    );
}