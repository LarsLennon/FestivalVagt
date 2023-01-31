import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem, Row, Table } from "reactstrap";

import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { ShiftDTO, TeamDTO } from "../../interface/interface";
import moment from "moment";
import React from "react";


interface IFooBar {
  username?: string;
}
export default function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState<TeamDTO[]>([]);
  const loadApiData = () => {
    const response = apiService.getTeams().then(
      (response) => {
        setTeams(response.data);
        console.log(response.data)
      })
  };
  useEffect(() => {
    loadApiData();
  }, []);

  
  const renderTeams = teams.map((team, index) => {
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
