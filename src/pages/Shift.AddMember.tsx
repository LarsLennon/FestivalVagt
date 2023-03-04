import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { ShiftDetailsDTO } from "../interface/interface";
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import React from "react";


export default function ShiftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<ShiftDetailsDTO>();
  const loadApiData = () => {
    apiService.getShift(parseInt(id!)).then(
      (response) => {
        setLoading(false);
        setApiData(response.data);
        console.log(response.data)
      })
  };

  useEffect(() => {
    if (isLoading) {
      loadApiData();
    }
  });

  const handleRemove = () => {
    // apiService.deleteSection(apiData!.sectionId).then(
    //   () => {
    //     navigate("/manage/team/" + apiData?.team.teamId);
    //   })
  };

  const renderMembers = apiData?.members.map((filteredItem, index) => {
    return (
      <React.Fragment key={index}>
        <tr>
          <th scope="row">
            {/* <Button color="info" onClick={() => handleImport(filteredItem.TeamId)}>Import</Button> */}
          </th>
          <td>{filteredItem.name}</td>
          <td>{filteredItem.driver ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.experienced ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.firstAid ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{!filteredItem.requireAttributes ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.units?.toFixed(1)}</td>
          <td></td>
        </tr>
      </React.Fragment>
    );
  });

  return (

    <Container fluid="lg">
      <h2>Shift: {apiData?.shiftId} {apiData?.name}</h2>
      {/* <Button disabled={isLoading} onClick={() => navigate("/manage/import/" + apiData?.sectionId)}>Importer vagtplan</Button>
      <Button onClick={() => navigate("/manage/section/edit/" + apiData?.sectionId)}>Edit</Button>
      <Button color="danger" onClick={handleDelete}>Delete</Button> */}

      <Row className="col-2">
        <Col>
          Open:
        </Col>
        <Col>
          {/* {apiData?.StartTime} */}
        </Col>
      </Row>
      <Row>
        <Col>
          Close:
        </Col>
        <Col>
          {/* {apiData?.EndTime} */}
        </Col>
      </Row>


      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Navn</th>
            <th>23+Kørekort</th>
            <th>Erfaren</th>
            <th>Førstehjælp</th>
            <th>Udfyldt</th>
            <th>FestivalTimer</th>
          </tr>
        </thead>
        <tbody>
          {renderMembers}
        </tbody>
      </Table>
    </Container>


  );
}
