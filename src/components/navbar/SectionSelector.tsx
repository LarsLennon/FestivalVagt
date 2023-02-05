import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { SectionDetailsDTO, SectionDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import { useGlobalContext } from "../../hooks/GlobalContent";


export default function SectionSelector() {
  const { sectionId, setSectionId } = useGlobalContext()
  const { sectionName, setSectionName } = useGlobalContext()
  const [currentSection, setCurrentSection] = useState<SectionDetailsDTO>();



  const [apiData, setApiData] = useState<SectionDetailsDTO[]>([]);
  const getApiData = () => {
      const response = apiService.getSections().then(
          (response) => {
              setApiData(response.data);
          })
  };

  useEffect(() => {
    getApiData();
    // if (apiData.length > 0) {
    //   selectSection(apiData[0]);
    // }
  }, []);



  const selectSection = (section: SectionDetailsDTO) => {
    console.log("selectSection: " + section.name);
    setCurrentSection(section);
    setSectionId(section.sectionId);
    setSectionName(section.team.name +  " - " + section.name);
    // setContext({participantId: section.name})
    
    console.log("selectSection")
    // if (props.onSectionChange !== undefined) {
    //   props.onSectionChange(section.sectionId);
    // }
  };

  // if (apiData.length > 0 && currentSection == null) {
  //   selectSection(apiData[0]);
  // }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle className="text-dark" nav caret>
        {sectionName == "" ? "Loading..." : sectionName}
      </DropdownToggle>
      <DropdownMenu end>
        {apiData.map((item, idx) => (
          <DropdownItem
            key={idx}
            onClick={() => {
              selectSection(item);
            }}
          >
            {item.team.name +  " - " + item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
    
  );
}
