import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { ShiftTypeCreateDTO, TeamDTO } from "../interface/interface";


export default function ShiftTypeCreate() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");



    const [isLoading, setLoading] = useState(true);
    const [apiData, setApiData] = useState<TeamDTO>();
    const loadApiData = () => {
        apiService.getTeam(parseInt(id!)).then(
            (response) => {
                setLoading(false);
                setApiData(response.data);
            })
    };

    useEffect(() => {
        if (isLoading) {
            loadApiData();
        }
    });

    const SubmitData = () => {
        const submitData: ShiftTypeCreateDTO = {
            name: name,
            description: description,
            priority: priority,
            teamId: apiData!.teamId!
        };
        apiService.createShiftType(submitData).then(
            () => {
                //setTeam(response.data);
            })
    };

    function handleName(event: any) {
        setName(event.target.value);
    }
    function handleDesc(event: any) {
        setDescription(event.target.value);
    }
    function handlePriority(event: any) {
        setPriority(event.target.value);
    }

    if (isLoading) {
        return (<Alert color="warning">Loading...</Alert>);
    }
    else {
        return (
            <Container fluid="lg">
                <h2>{apiData?.number} - {apiData?.name}</h2>
                <h2>Opret Vagt Type</h2>
                <Row xs="2"><Col>
                    <Form>
                        <FormGroup>
                            <Label>
                                Name
                            </Label>
                            <Input
                                type="text"
                                onChange={handleName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Description
                            </Label>
                            <Input
                                type="text"
                                onChange={handleDesc}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Priority
                            </Label>
                            <Input
                                type="text"
                                onChange={handlePriority}
                            />
                        </FormGroup>

                        <Button onClick={SubmitData}>
                            Submit
                        </Button>
                    </Form>
                </Col></Row>
            </Container>

        );
    }
}
