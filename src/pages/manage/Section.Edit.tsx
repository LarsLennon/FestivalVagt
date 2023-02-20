import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import { useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import { SectionDetailsDTO, SectionEditDTO } from "../../interface/interface";


export default function SectionEdit() {
  const { id } = useParams();

  const [isActive, setActive] = useState(false);
  const [name, setName] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
      (response) => {
        setLoading(false);
        setApiData(response.data);
        setName(response.data.name);
        setActive(response.data.isActive);
      })
  };
  useEffect(() => {
    if (isLoading) {
      loadApiData();
    }
  });


  const SubmitData = () => {
    const newSection: SectionEditDTO = {
        SectionId: id!,
        Name: name,
        isActive: isActive
      };
      apiService.updateSection(newSection).then(
        () => {
          //setTeam(response.data);
        })
  };

  const onChangeUsername = (event: any) => {
    setName(event.target.value);
  };

  const onChangeActive = (event: any) => {
    setActive(event.target.checked);
    console.log("onChangeActive " + event.target.checked)
    console.log(event.target)
  };

  return (

    <Container fluid="lg">
      <h2>Edit {apiData?.name} tilhørende {apiData?.team.number} - {apiData?.team.name}</h2>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">
            Navn
          </Label>
          <Input
            type="text"
            id="formName"
            name="name"
            defaultValue={name}
            onChange={onChangeUsername}
          />
        </FormGroup>
        <FormGroup check>
          <Input 
          type="checkbox" 
          checked={isActive}
          onChange={onChangeActive}
           />
          {' '}
          <Label check>
            Active
          </Label>
        </FormGroup>
        <Button onClick={SubmitData}>
          Submit
        </Button>
      </Form>
    </Container>


  );
}
