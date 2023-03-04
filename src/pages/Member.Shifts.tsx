import moment from "moment";
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle, Col, Container, ListGroup, Row } from "reactstrap";
import FestivalUnits from "../components/FestivalUnits";
import { useGlobalContext } from "../hooks/GlobalContent";
import { MyShiftsDTO, ShiftDTO } from "../interface/interface";
import ApiService from '../services/api.service';

export default function MemberShifts() {
    const { sectionId } = useGlobalContext();
    const weekdays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

    const [apiData, setApiData] = useState<MyShiftsDTO>();
    const loadApiData = () => {
        ApiService.getMembersShifts(sectionId).then(
            (response) => {
                setApiData(response.data);
                // console.log(response.data);
            })
    };

    useEffect(() => {
        loadApiData();
    }, [sectionId]); // eslint-disable-line react-hooks/exhaustive-deps


    const renderTimerMinutter = (startTime: string, endTime: string) => {
        const a = moment(startTime);
        const b = moment(endTime);

        var duration = moment.duration(b.diff(a));
        var hours = duration.asHours();

        return (
            <small>{hours.toFixed(1)} timer</small>
        );
    };

    const mapShifts = apiData?.shifts.map((shift: ShiftDTO, index: number) => {
        return (
            <Card key={index}>
                <CardBody>
                    <CardTitle>
                                <h5><b>{moment(shift.startTime).format("HH:mm")} - {moment(shift.endTime).format("HH:mm")} {moment(shift.endTime).format("DD/MM yyyy")}</b></h5>                              
                                <h6>{weekdays[moment(shift.endTime).day()] + " Uge " + moment(shift.endTime).week()}</h6>
                    </CardTitle>
                    <CardText>
                        <Row>
                            <Col className="col-sm">
                                <b>{shift.name}</b>                    
                                </Col>
                        </Row>
                        <Row>
                            <Col className="col-sm">
                            {renderTimerMinutter(shift.startTime!, shift.endTime!)} - 
                            <small>{shift.units.toFixed(1)} Festival-timer</small>
                            </Col>
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        );
    });


    return (
        <div>
            <FestivalUnits
                units={apiData == null ? 0 : apiData!.units}
                sectionName={apiData?.name!}
            ></FestivalUnits>
            <Container fluid="lg">
                <Row>
                    <Col>
                        <ListGroup>
                            {mapShifts}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}