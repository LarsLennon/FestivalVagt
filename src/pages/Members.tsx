import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row, Table } from "reactstrap";
import { MemberDTO, ShiftDTO } from "../interface/interface";
import apiService from "../services/api.service";
import { BsSearch } from 'react-icons/bs';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { useGlobalContext } from "../hooks/GlobalContent";

export default function Members() {
  const [searchInput, setSearchInput] = useState("");
  const { sectionId } = useGlobalContext();

  const [apiData, setApiData] = useState<MemberDTO[]>([]);
  const reloadItemResources = () => {
    const response = apiService.getMembers(sectionId).then(
      (response) => {
        setApiData(response.data);
      })
  };

  useEffect(() => {
    reloadItemResources();
  }, [sectionId]);


  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleImport = (membaTeamId: any) => {
    console.log(membaTeamId);
    const response = apiService.importTeam(membaTeamId).then(
      (response) => {
        //setTeams(response.data);
      })
  };

  const filteredData = apiData.filter((data) => {
    return data.name!.toLowerCase().match(searchInput) || data.membaNumber!.toLowerCase().match(searchInput);
  });


  const renderApiData = filteredData.map((filteredItem, index) => {
    return (
      <React.Fragment key={index}>
        <tr>
          <th scope="row">
            {/* <Button color="info" onClick={() => handleImport(filteredItem.TeamId)}>Import</Button> */}
          </th>
          <td>{filteredItem.name}</td>
          <td>{filteredItem.membaNumber}</td>
          <td>{filteredItem.driver ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.experienced ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.firstAid ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
          <td>{filteredItem.units}</td>
          <td></td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <Container fluid="lg">
      <h3> Lets go for a <BsSearch />? </h3>
      <input
        type="search"
        placeholder="Søg"
        onChange={handleChange}
        value={searchInput} />

      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Navn</th>
            <th>MembaNummer</th>
            <th>23+Kørekort</th>
            <th>Erfaren</th>
            <th>Førstehjælp</th>
            <th>FestivalTimer</th>
          </tr>
        </thead>

        <tbody>

          {renderApiData}
        </tbody>

      </Table>
    </Container>
  );
}