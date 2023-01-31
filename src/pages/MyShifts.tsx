import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ShiftDTO } from "../interface/interface";
import ApiService from '../services/api.service';

export default function MyShifts() {

    const [shifts, setShifts] = useState<ShiftDTO[]>([]);

    const reloadItemResources = () => {
        const response = ApiService.getMembersShifts().then(
            (response) => {
                setShifts(response.data);
            })
    };

    useEffect(() => {
        reloadItemResources();
    }, []);



    const mapShifts = shifts.map((shift: ShiftDTO, index: number) => {
        return (
            <ListGroupItem key={index}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{moment(shift.StartTime).format("HH:mm")} - {moment(shift.EndTime).format("HH:mm")}</h5>
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