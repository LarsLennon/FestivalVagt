import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { SectionDTO, TeamDetailsDTO } from "../interface/interface";

export default function Team() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<TeamDetailsDTO>();
  const loadApiData = () => {
    apiService.getTeam(parseInt(id!)).then(
      (response) => {
        setApiData(response.data);

      })
  };
  useEffect(() => {
      loadApiData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mapSections = apiData?.sections.map((section: SectionDTO, index: number) => {
    return (
      <ListGroupItem color={section.isActive ? "success" : ""} key={index} action onClick={() => navigate("/manage/section/" + section.sectionId)}>
        <h5 className="mb-1">{section.name} {section.isActive ? "(Active)" : ""}</h5>
        {/* <small className="mb-1">VoV Skranke</small> */}
      </ListGroupItem>
    );
  });

  const handleImport = () => {
    console.log(apiData?.teamId);
    apiService.syncMembers(apiData?.teamId!).then(
      () => {
        //setTeams(response.data);
      })
  };

  return (

    <Container fluid="lg">
      <h2>Hold: {apiData?.number} - {apiData?.name}</h2>
      {/* <Button onClick={() => navigate("/team/sync")}>Team Sync</Button> */}

      <Row xs="2">
        <Col>
          <h3>
            Vagtplan
          </h3>
          <Button onClick={() => navigate("/manage/create/" + apiData?.teamId)}>Opret Vagtplan</Button>
          <Button color="danger" onClick={() => handleImport()}>Sync Medlemmer</Button>
          <ListGroup>
            {mapSections}
          </ListGroup>
        </Col>
      </Row>
    </Container>

  );
}
