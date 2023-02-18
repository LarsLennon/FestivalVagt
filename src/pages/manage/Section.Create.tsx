import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionCreateDTO, TeamDTO } from "../../interface/interface";


export default function SectionCreate() {
  const { id } = useParams();

  const [team, setTeam] = useState<TeamDTO>();
  const loadApiData = () => {
    apiService.getTeam(parseInt(id!)).then(
      (response) => {
        setTeam(response.data);
      })
  };
  useEffect(() => {
    loadApiData();
  });

  const SubmitData = () => {
    if (true) {
      const newSection: SectionCreateDTO = {
        Name: "2023",
        TeamId: team!.teamId
      };
      apiService.createSection(newSection).then(
        () => {
          //setTeam(response.data);
        })
    }
  };

  return (

    <Container fluid="lg">
      <h2>Opret Vagtplan for {team?.number} - {team?.name}</h2>
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
