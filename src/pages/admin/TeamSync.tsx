import { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";

import apiService from "../../services/api.service";
import { MembaTeamDTO } from "../../interface/interface";
import React from "react";

export default function TeamSync() {
  const [searchInput, setSearchInput] = useState("");
   
  const [apiData, setApiData] = useState<MembaTeamDTO[]>([]);

  const loadApiData = () => {
    apiService.getMembaTeams().then(
      (response) => {
        setApiData(response.data);
      })
  };

  useEffect(() => {
    if(apiData.length == 0)
    {
      loadApiData();
    }
  });


  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleImport = (membaTeamId: any) => {
    console.log(membaTeamId);
    apiService.importTeam(membaTeamId).then(
      () => {
        //setTeams(response.data);
      })
  };

  const filteredData = apiData.filter((data) => {
    return data.TeamName!.toLowerCase().match(searchInput) || data.TeamNumber!.toLowerCase().match(searchInput);
  });


  const renderTeams = filteredData.map((filteredItem, index) => {
    return (
      <React.Fragment key={index}>
        <tr>        
          <th scope="row">
          <Button color="info" onClick={() => handleImport(filteredItem.TeamId)}>Import</Button>
        </th>
          <td>{filteredItem.TeamNumber}</td>
          <td>{filteredItem.TeamName}</td>
          <td>{filteredItem.TeamParentId}</td>
          <td>{filteredItem.IsGroup ? "Yes" : "No"}</td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <Container fluid="lg">
      <input
        type="search"
        placeholder="Søg"
        onChange={handleChange}
        value={searchInput} />

      <Table>
        <thead>
          <tr>
            <th></th>
            <th>TeamNumber</th>
            <th>TeamName</th>
            <th>Parent</th>
            <th>IsGroup</th>
          </tr>
       </thead>

       <tbody>

          {renderTeams}
        </tbody>

      </Table>
      </Container>
  );
}
