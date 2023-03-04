import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { MemberDetailsDTO } from "../interface/interface";


export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<MemberDetailsDTO>();
  const loadApiData = () => {
    apiService.getMember(id!).then(
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


  return (

    <Container fluid="lg">
      <h2>{apiData?.name} </h2>
      {/* <Button disabled={isLoading} onClick={() => navigate("/import/" + apiData?.sectionId)}>Importer vagtplan</Button> */}
      <Button onClick={() => navigate("/member/edit/" + apiData?.memberId)}>Edit</Button>
      {/* <Button color="danger" onClick={handleDelete}>Delete</Button> */}
     
<Form>

  <FormGroup check>
    <Input
      type="checkbox"
      checked={apiData?.driver}
      disabled={true}
    />
    {' '}
    <Label check>
      Kørekort
    </Label>
  </FormGroup>

  <FormGroup check>
    <Input
      disabled={true}
      type="checkbox"
      checked={apiData?.experienced}
    />
    {' '}
    <Label check>
      Erfaren
    </Label>
  </FormGroup>

  <FormGroup check>
    <Input
      disabled={true}
      type="checkbox"
      checked={apiData?.firstAid}
    />
    {' '}
    <Label check>
      Førstehjælp
    </Label>
  </FormGroup>

  <FormGroup check>
    <Input
      disabled={true}
      type="checkbox"
      checked={apiData?.requireAttributes}
    />
    {' '}
    <Label check>
      Kræv Attributter
    </Label>
  </FormGroup>
</Form>
</Container>

  );
}
