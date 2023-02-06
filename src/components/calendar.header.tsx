import moment from "moment";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";
import "./calendar.header.css"
import { useGlobalContext } from "../hooks/GlobalContent";

interface Iprops {
    firstShiftDate: string;
    lastShiftDate: string;
}
export default function CalenderHeader(props: Iprops) {
    const { sectionId, setSectionId } = useGlobalContext()

    const { time, index } = useParams();
    const navigate = useNavigate();


    const weekdays = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    let currentTime = "";

    function HeaderText() {
        if (time == "week") {
            return (<h2 className="headertext">Uge</h2>);
        }
        return (<h2 className="headertext">{weekdays[0]}</h2>);
    }

    return (
        <Container fluid>
            <h2 className="headertext"> 1234 Walthers VoV - {sectionId} </h2>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button onClick={() => navigate("/calendar/" + currentTime + "/")}>
                            Tilbage
                        </Button>
                        <Button>
                            Dags Dato
                        </Button>
                        <Button onClick={() => navigate("/calendar/" + currentTime + "/")}>
                            Frem
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col>
                    {HeaderText()}
                </Col>
                <Col>
                    <div style={{ display: "flex" }}>
                        <ButtonGroup style={{ marginLeft: "auto" }}>
                            <Button onClick={() => navigate("/calendar/week")}>
                                Uge
                            </Button>
                            <Button onClick={() => navigate("/calendar/month")}>
                                Måned
                            </Button>
                            <Button onClick={() => setSectionId("Hurra")}>
                                setContext
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}