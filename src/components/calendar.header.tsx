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
    const { sectionName } = useGlobalContext()
    const { calendarTimeline, setCalendarTimeline } = useGlobalContext()
    const { calendarDate, setCalendarDate } = useGlobalContext()

    const { time, index } = useParams();
    const navigate = useNavigate();


    const weekdays = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    let currentTime = "";

    function HeaderText() {
        if (calendarTimeline == "week") {
            return (<h2 className="headertext">Uge {moment(calendarDate).week()}</h2>);
        }
        let month = moment(calendarDate).month();
        console.log(moment().month(calendarDate))
        return (<h2 className="headertext">{weekdays[month]}</h2>);
    }

    function momentFormat(date:any) {
        return moment(date).format("yyyy-MM-DD")
    }

    function handleMonth() {
        setCalendarTimeline("month")
    }

    function handleWeek() {
        setCalendarTimeline("week")
    }

    function handleAll() {
        setCalendarTimeline("all")
    }

   
    function handlePrev() {
        if(calendarTimeline == "month")
        {
            let nextDate = moment(calendarDate).subtract(1, 'month');
            setCalendarDate(momentFormat(nextDate))
        }
        if(calendarTimeline == "week")
        {
            let nextDate = moment(calendarDate).subtract(1, 'week');
            setCalendarDate(momentFormat(nextDate))
        }
    }

    function handleNext() {
        if(calendarTimeline == "month")
        {
            let nextDate = moment(calendarDate).add(1, 'month');
            setCalendarDate(momentFormat(nextDate))
        }
        if(calendarTimeline == "week")
        {
            let nextDate = moment(calendarDate).add(1, 'week');
            setCalendarDate(momentFormat(nextDate))
        }
    }


    return (
        <Container fluid>
            <h2 className="headertext">{sectionName} </h2>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button onClick={handlePrev}>
                            Tilbage
                        </Button>
                        <Button>
                            Dags Dato
                        </Button>
                        <Button onClick={handleNext}>
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
                            <Button onClick={handleWeek}>
                                Uge
                            </Button>
                            <Button onClick={handleMonth}>
                                Måned
                            </Button>
                            <Button onClick={handleAll}>
                                Alle
                            </Button>
                            {/* <Button onClick={() => setSectionId("Hurra")}>
                                setContext
                            </Button> */}
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}