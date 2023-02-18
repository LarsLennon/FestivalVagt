import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, ListGroupItem, Row, Table } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionDTO, TeamDetailsDTO } from "../../interface/interface";
import moment from "moment";

export default function Team() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState<TeamDetailsDTO>();
  const loadApiData = () => {
    const response = apiService.getTeam(parseInt(id!)).then(
      (response) => {
        setTeam(response.data);

      })
  };
  useEffect(() => {
    loadApiData();
  }, []);

  const mapSections = team?.sections.map((section: SectionDTO, index: number) => {
    return (
      <ListGroupItem key={index} action onClick={() => navigate("/manage/section/" + section.sectionId)}>
        <h5 className="mb-1">{section.name}</h5>
        {/* <small className="mb-1">VoV Skranke</small> */}
      </ListGroupItem>
    );
  });

  return (

    <Container fluid="lg">
      <h2>Hold: {team?.number} - {team?.name}</h2>
      {/* <Button onClick={() => navigate("/team/sync")}>Team Sync</Button> */}

      <Row xs="2">
        <Col>
          <h3>
            Vagtplan
          </h3>
          <Button onClick={() => navigate("/manage/create/" + team?.teamId)}>Opret Vagtplan</Button>
          <ListGroup>
            {mapSections}
          </ListGroup>
        </Col>
      </Row>
    </Container>

  );
}
