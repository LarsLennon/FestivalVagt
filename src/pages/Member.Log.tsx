import React from "react";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { MemberLogDTO } from "../interface/interface";
import apiService from "../services/api.service";
import { useGlobalContext } from "../hooks/GlobalContent";
import { useNavigate } from "react-router-dom";

export default function MemberLog() {
  const navigate = useNavigate();
  const { sectionId } = useGlobalContext();

  const [apiData, setApiData] = useState<MemberLogDTO[]>([]);
  const loadApiData = () => {
    apiService.getMemberLogs().then(
      (response) => {
        setApiData(response.data);
        console.log(response.data)
      })
  };


  useEffect(() => {
    loadApiData();
  }, [sectionId]); // eslint-disable-line react-hooks/exhaustive-deps


  // const handleImport = (membaTeamId: any) => {
  //   console.log(membaTeamId);
  //   apiService.importTeam(membaTeamId).then(
  //     () => {
  //       //setTeams(response.data);
  //     })
  // };



  const renderApiData = apiData.map((row, index) => {
    return (
      <React.Fragment key={index}>
        <tr>
          <td>{row.timeStamp}</td>
          <td>{row.operatorMember}</td>
          <td>{row.applicationMember}</td>
          <td>{row.message}</td>
          {/* <td>{filteredItem.name}</td>
          <td>{filteredItem.membaNumber}</td>
          <td>{filteredItem.driver ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.experienced ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.firstAid ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{!filteredItem.requireAttributes ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.units?.toFixed(1)}</td> */}
          <td></td>
        </tr>
      </React.Fragment>
    );
  });

  const memberDetails = (memberId: number) => {
    navigate("/member/details/" + memberId)
  }


  return (
    <Container fluid="lg">
      <h3>Log</h3>


      <Table hover>
        <thead>
          <tr>
            <th>Tid</th>
            <th>Bruger</th>
            <th>Medlem</th>
          </tr>
        </thead>

        <tbody>

          {renderApiData}
        </tbody>

      </Table>
    </Container>
  );
}