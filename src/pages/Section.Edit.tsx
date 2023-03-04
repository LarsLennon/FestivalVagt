import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { SectionDetailsDTO, SectionEditDTO } from "../interface/interface";
import DateTimePicker from "../components/formcomponents/DateTimePicker";
import moment from "moment";


export default function SectionEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDate, setOpenDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());

  const [isActive, setActive] = useState(false);
  const [name, setName] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<SectionDetailsDTO>();
  const loadApiData = () => {
    apiService.getSection(parseInt(id!)).then(
      (response) => {
        console.log(response.data)
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
    var newOpenDate = moment(openDate).format('yyyy-MM-DD hh:mm'); //openDate.toString("yyyy-MM-dd hh:mm"),
    var newCloseDate = moment(openDate).format('yyyy-MM-DD hh:mm'); //openDate.toString("yyyy-MM-dd hh:mm"),

    const newSection: SectionEditDTO = {
      SectionId: id!,
      Name: name,
      isActive: isActive,
      openTime: newOpenDate,
      closeTime: newCloseDate
    };
    apiService.updateSection(newSection).then(
      () => {
        
        navigate("/section/details/" + id);
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
          <Label for="exampleName">
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
        <FormGroup>
          <Label for="exampleSelectMultiTo">Open</Label>
          <DateTimePicker
            initDate={openDate}
            onChange={setOpenDate}
            placeholderText="Open Date"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMultiTo">Close</Label>
          <DateTimePicker
            initDate={closeDate}
            onChange={setCloseDate}
            placeholderText="Close Date"
          />
        </FormGroup>
        <Button onClick={SubmitData}>
          Submit
        </Button>
      </Form>
    </Container>


  );
}
