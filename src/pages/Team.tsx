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

  const handleSyncMembers = () => {
    apiService.syncMembers(apiData?.teamId!).then(
      () => {
        //setTeams(response.data);
      })
  };

  const handleImport = () => {
    apiService.importVoV(apiData!.teamId).then(
      () => {
        //setTeams(response.data);
      })
  };

  const handleAttributes = () => {
    apiService.resetAttributes(apiData!.teamId).then(
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
          <Button color="danger" onClick={() => handleSyncMembers()}>Sync Medlemmer</Button>
          <Button color="danger" onClick={() => handleImport()}>Import VoV</Button>
          <Button color="info" onClick={() => navigate("/ShiftType/Create/" + apiData?.teamId)}>Create ShiftType</Button>
          <Button color="info" onClick={() => handleAttributes()}>Require Attributes</Button>
          <ListGroup>
            {mapSections}
          </ListGroup>
        </Col>
      </Row>
    </Container>

  );
}
