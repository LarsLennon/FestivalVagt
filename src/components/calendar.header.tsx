import moment from "moment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";
import "./calendar.header.css"

interface Iprops {
    index: number;
}
export default function CalenderHeader(props: Iprops) {
    const { time, index } = useParams();
    const navigate = useNavigate();
    const [prevEnabled, setPrevEnabled] = useState(1);
    const [nextEnabled, setNextEnabled] = useState(true);
    const close = () => navigate("Calendar/Lars");

    let mDateObject = moment("2023-02-01")
    
    const weekdays = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    let currentTime = "";
    if (time == null || time == "") {
        navigate("/calendar/week")
    }
    else {
        currentTime = time;
        //setNextEnabled(true)
    }
    //setNextEnabled(false)

    function HeaderText() {
        if (time == "week") {
          return (<h2 className="headertext">Uge {props.index}</h2>);
        }
        return (<h2 className="headertext">{weekdays[Number(props.index)]}</h2>);
      }

    return (
        <Container fluid>
            <h2 className="headertext">1234 Walthers VoV</h2>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button onClick={() => navigate("/calendar/" + currentTime + "/" + (props.index - 1))}>
                            Tilbage
                        </Button>
                        <Button>
                            Dags Dato
                        </Button>
                        <Button onClick={() => navigate("/calendar/" + currentTime + "/" + (props.index + 1))}>
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
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}