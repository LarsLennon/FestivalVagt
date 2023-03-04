import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { MemberDetailsDTO, MemberEditDTO } from "../interface/interface";

export default function MemberEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driver, setDriver] = useState(false);
  const [experienced, setExperienced] = useState(false);
  const [firstAid, setFirstAid] = useState(false);
  const [requireAttributes, setRequireAttributes] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<MemberDetailsDTO>();
  const loadApiData = () => {
    apiService.getMember(id!).then(
      (response) => {
        console.log(response.data)
        const memberDetails:MemberDetailsDTO = response.data;
        setLoading(false);
        setApiData(response.data);
        setDriver(memberDetails.driver);
        setExperienced(memberDetails.experienced);
        setFirstAid(memberDetails.firstAid);
        setRequireAttributes(memberDetails.requireAttributes);
      })
  };
  useEffect(() => {
    if (isLoading) {
      loadApiData();
    }
  });


  const SubmitData = () => {
    const data: MemberEditDTO = {
      memberId: id!,
      driver: driver,
      experienced: experienced,
      firstAid: firstAid,
      requireAttributes: requireAttributes
    };
    apiService.editMember(data).then(
      () => {
        navigate("/member/details/" + apiData?.memberId)
      })
  };

  const onChangeDriver = (event: any) => {
    setDriver(event.target.checked);
  };

  const onChangeExperienced = (event: any) => {
    setExperienced(event.target.checked);
  };

  const onChangeFirstAid = (event: any) => {
    setFirstAid(event.target.checked);
  };

  const onChangeRequireAttributes = (event: any) => {
    setRequireAttributes(event.target.checked);
  };

  return (

    <Container fluid="lg">
      <h2>Edit {apiData?.name}</h2>
      <Form>

        <FormGroup check>
          <Input
            type="checkbox"
            checked={driver}
            onChange={onChangeDriver}
          />
          {' '}
          <Label check>
            Kørekort
          </Label>
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            checked={experienced}
            onChange={onChangeExperienced}
          />
          {' '}
          <Label check>
            Erfaren
          </Label>
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            checked={firstAid}
            onChange={onChangeFirstAid}
          />
          {' '}
          <Label check>
            Førstehjælp
          </Label>
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            checked={requireAttributes}
            onChange={onChangeRequireAttributes}
          />
          {' '}
          <Label check>
            Kræv Attributter
          </Label>
        </FormGroup>
        <Button onClick={SubmitData}>
          Submit
        </Button>
      </Form>
    </Container>


  );
}
