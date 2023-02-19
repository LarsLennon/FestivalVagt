import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionDetailsDTO } from "../../interface/interface";


export default function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
      (response) => {
        setApiData(response.data);
      })
  };
  useEffect(() => {
    if(apiData === null)
    {
      loadApiData();
    }
  });


  return (

    <Container fluid="lg">
    <h2>Vagtplan {apiData?.name} tilhørende {apiData?.team.number} - {apiData?.team.name}</h2>
      <Button onClick={() => navigate("/manage/import/" + apiData?.sectionId)}>Importer vagtplan</Button>

    </Container>


  );
}
