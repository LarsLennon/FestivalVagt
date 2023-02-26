import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
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
                console.log(response.data);
            })
    };

    useEffect(() => {
        loadApiData();
    }, [sectionId]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderDate = (startTime:string, endTime:string) => {
        return (
            <h5 className="mb-1">{weekdays[moment(endTime).day()] + " Uge " + moment(endTime).week()}</h5>
        );
    };

    const renderTimerMinutter = (startTime:string, endTime:string) => {
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
            <ListGroupItem key={index}>
                <div className="d-flex w-100 justify-content-between">
                {renderDate(shift.startTime!, shift.endTime!)}
                    <small>{shift.units.toFixed(1)} Festival-timer</small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{moment(shift.startTime).format("HH:mm")} - {moment(shift.endTime).format("HH:mm")} {moment(shift.endTime).format("DD/MM yyyy")}</h5>
                    {renderTimerMinutter(shift.startTime!, shift.endTime!)}
                </div>
            {/* <h5 className="mb-1">{moment(shift.endTime).format("DD/MM yyyy")}</h5> */}
            </ListGroupItem>
        );
    });


    return (
        <div>
            <FestivalUnits 
            units={apiData== null ? 0 : apiData!.units}
            sectionName={apiData?.name!}
            ></FestivalUnits>
            <Container fluid="lg">
                <Row xs="2">
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