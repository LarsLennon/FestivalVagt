import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";
import "./calendar.header.css"
export default function CalenderHeader() {

    return (
        <Container fluid>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button>
                            Tilbage
                        </Button>
                        <Button>
                            Dags Dato
                        </Button>
                        <Button>
                            Frem
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col>
                    <h2 className="headertext">Uge 32</h2>
                </Col>
                <Col>
                    <div style={{ display: "flex" }}>
                        <ButtonGroup style={{ marginLeft: "auto" }}>
                            <Button>
                                Uge
                            </Button>
                            <Button>
                                Måned
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}