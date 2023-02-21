import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionCreateDTO, TeamDTO } from "../../interface/interface";


export default function SectionCreate() {
  const { id } = useParams();

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
    if (true) {
      const newSection: SectionCreateDTO = {
        Name: "2023",
        TeamId: apiData!.teamId
      };
      apiService.createSection(newSection).then(
        () => {
          //setTeam(response.data);
        })
    }
  };

  return (

    <Container fluid="lg">
      <h2>Opret Vagtplan for {apiData?.number} - {apiData?.name}</h2>
      <Row xs="2"><Col>
        <Form>
          <FormGroup>
            <Label for="exampleName">
              Name
            </Label>
            <Input
              id="exampleName"
              name="name"
              type="text"
            />
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" />
            {' '}
            <Label check>
              Check me out
            </Label>
          </FormGroup>
          <Button onClick={SubmitData}>
            Submit
          </Button>
        </Form>
      </Col></Row>
    </Container>

  );
}
