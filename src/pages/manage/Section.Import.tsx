import { useEffect, useState } from "react";
import { Form, Button, Col, Container, FormGroup, Input, Label, Row, FormText } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionDetailsDTO } from "../../interface/interface";


export default function SectionImport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fileName, setFileName] = useState();

  const [apiData, setApiData] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
      (response) => {
        setApiData(response.data);
        console.log(response.data)
      })
  };
  useEffect(() => {
    if(apiData == null)
    {
      loadApiData();
    }
  });

  const submitData = () => {
    if (true) {
      // const newSection:SectionCreateDTO = {
      //   Name: "2023",
      //   TeamId: team!.teamId
      // };
    // console.log(fileName)
    console.log(apiData)
      apiService.importShifts(apiData!.sectionId, fileName).then(
        () => {
          //setTeam(response.data);
          navigate("/calendar")
        })
    }
  };


  const onChangeFile = (event: any) => {
    setFileName(event.target.files[0])
    //console.log(event.target)
};

  return (


    <Container fluid="lg">
      <h2>Importer vagter til {apiData?.name} tilhørende {apiData?.team.number} - {apiData?.team.name}</h2>

      <Row xs="2"><Col>
        <Form id="uploadForm" encType="multipart/form-data">
          <FormGroup>
            <Label for="exampleFile">
              File
            </Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              onChange={onChangeFile}
            />
            <FormText>
              This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <Button onClick={submitData}>
            Submit
          </Button>
        </Form>
      </Col></Row>
    </Container>


  );
}
