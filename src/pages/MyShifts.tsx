import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ShiftDTO } from "../interface/interface";
import ApiService from '../services/api.service';

export default function MyShifts() {

    const [apiData, setApiData] = useState<ShiftDTO[]>([]);
    const loadApiData = () => {
        ApiService.getMembersShifts().then(
            (response) => {
                setApiData(response.data);
            })
    };

    useEffect(() => {
        if(apiData.length == 0)
        {
          loadApiData();
        }
      });



    const mapShifts = apiData.map((shift: ShiftDTO, index: number) => {
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