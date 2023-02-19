import React from "react";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { MemberDTO } from "../interface/interface";
import apiService from "../services/api.service";
import { BsSearch } from 'react-icons/bs';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { useGlobalContext } from "../hooks/GlobalContent";

export default function Member() {
  const [searchInput, setSearchInput] = useState("");
  const { sectionId } = useGlobalContext();

  const [apiData, setApiData] = useState<MemberDTO>();
  const loadApiData = () => {
    apiService.getMembers(sectionId).then(
      (response) => {
        setApiData(response.data);
      })
  };


  useEffect(() => {
    if(apiData === null)
    {
      loadApiData();
    }
  });


  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  // const handleImport = (membaTeamId: any) => {
  //   console.log(membaTeamId);
  //   apiService.importTeam(membaTeamId).then(
  //     () => {
  //       //setTeams(response.data);
  //     })
  // };


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

        </tbody>

      </Table>
    </Container>
  );
}