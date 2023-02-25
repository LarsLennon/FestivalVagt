import { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";

// import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { TeamDTO } from "../interface/interface";
import React from "react";


export default function Teams() {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<TeamDTO[]>([]);

  const loadApiData = () => {
    apiService.getTeams().then(
      (response) => {
        setApiData(response.data);
        console.log(response.data)
      })
  };

  useEffect(() => {
    if(apiData.length === 0)
    {
      loadApiData();
    }
  });


  const renderTeams = apiData.map((team, index) => {
    return (
      <React.Fragment key={index}>
        <tr onClick={() => navigate("/manage/team/" + team.teamId)}>
          <td>{team.number}</td>
          <td>{team.name}</td>
        </tr>
      </React.Fragment>
    );
  });


  return (

    <Container fluid="lg">
      <h2>Teams</h2>
      <Button onClick={() => navigate("/team/sync")}>Team Sync</Button>



      <Table hover>
        <thead>
          <tr>
            <th>Hold Nummer</th>
            <th>Hold Navn</th>
          </tr>
        </thead>
        <tbody>
          {renderTeams}
        </tbody>
      </Table>
    </Container>

  );
}
