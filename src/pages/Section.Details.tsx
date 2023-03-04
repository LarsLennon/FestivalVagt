import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { SectionDetailsDTO } from "../interface/interface";


export default function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
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

  const handleDelete = () => {
    apiService.deleteSection(apiData!.sectionId).then(
      () => {
        navigate("/manage/team/" + apiData?.team.teamId);
      })
  };

  return (

    <Container fluid="lg">
      <h2>Vagtplan {apiData?.name} tilhørende {apiData?.team.number} - {apiData?.team.name}</h2>
      <Button disabled={isLoading} onClick={() => navigate("/manage/import/" + apiData?.sectionId)}>Importer vagtplan</Button>
      <Button onClick={() => navigate("/manage/section/edit/" + apiData?.sectionId)}>Edit</Button>
      <Button color="danger" onClick={handleDelete}>Delete</Button>

      <Row className="col-2">
        <Col>
          Open:
        </Col>
        <Col>
          {apiData?.StartTime}
        </Col>
      </Row>
      <Row>
        <Col>
          Close:
        </Col>
        <Col>
          {apiData?.EndTime}
        </Col>
      </Row>

    </Container>


  );
}
