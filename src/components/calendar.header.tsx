import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";
import { useGlobalContext } from "../hooks/GlobalContent";
import "./calendar.header.css"

interface Iprops {
    firstShiftDate: string;
    lastShiftDate: string;
    sectionName: string;
}
export default function CalenderHeader(props: Iprops) {
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
        else if (calendarTimeline == "month") {
            let month = moment(calendarDate).month();
            return (<h2 className="headertext">{weekdays[month]}</h2>);
        }
        return (<h2 className="headertext">Alle</h2>);
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
            <h2 className="headertext">{props.sectionName} </h2>
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
                            <Button onClick={handleWeek} disabled={calendarTimeline == "week"}>
                                Uge
                            </Button>
                            <Button onClick={handleMonth} disabled={calendarTimeline == "month"}>
                                Måned
                            </Button>
                            <Button onClick={handleAll} disabled={calendarTimeline == "all"}>
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