import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionDetailsDTO } from "../../interface/interface";


export default function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
      (response) => {
        setSection(response.data);
      })
  };
  useEffect(() => {
    loadApiData();
  }, []);


  return (

    <Container fluid="lg">
    <h2>Vagtplan {section?.name} tilhørende {section?.team.number} - {section?.team.name}</h2>
      <Button onClick={() => navigate("/manage/import/" + section?.sectionId)}>Importer vagtplan</Button>

    </Container>


  );
}
