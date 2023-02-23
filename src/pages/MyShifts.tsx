import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import FestivalUnits from "../components/FestivalUnits";
import { useGlobalContext } from "../hooks/GlobalContent";
import { MyShiftsDTO, ShiftDTO } from "../interface/interface";
import ApiService from '../services/api.service';

export default function MyShifts() {
    const { sectionId } = useGlobalContext();

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



    const mapShifts = apiData?.shifts.map((shift: ShiftDTO, index: number) => {
        return (
            <ListGroupItem key={index}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{moment(shift.startTime).format("HH:mm")} - {moment(shift.endTime).format("HH:mm")}</h5>
                    <small>10,5 timer</small>
                </div>
                <small className="mb-1">VoV Skranke</small>
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