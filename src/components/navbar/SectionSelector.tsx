import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { SectionDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import { useGlobalContext } from "../../hooks/GlobalContent";


export default function SectionSelector() {
  const { sectionId, setSectionId } = useGlobalContext()
  const [currentSection, setCurrentSection] = useState<SectionDTO>();



  const [apiData, setApiData] = useState<SectionDTO[]>([]);
  const getApiData = () => {
      const response = apiService.getSections().then(
          (response) => {
              setApiData(response.data);
          })
  };

  useEffect(() => {
    getApiData();
    // if (sections.length > 0) {
    //   selectSection(sections[0]);
    // }
  }, []);

  useEffect(() => {
    getApiData();

  }, [sectionId]);


  const selectSection = (section: SectionDTO) => {
    console.log("selectSection: " + section.name);
    setCurrentSection(section);
    // setContext({participantId: section.name})
    setSectionId(section.sectionId);
    // if (props.onSectionChange !== undefined) {
    //   props.onSectionChange(section.sectionId);
    // }
  };

  if (apiData.length > 0 && currentSection == null) {
    selectSection(apiData[0]);
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle className="text-dark" nav caret>
        {currentSection == null ? "Loading..." : currentSection.name}
      </DropdownToggle>
      <DropdownMenu end>
        {apiData.map((item, idx) => (
          <DropdownItem
            key={idx}
            onClick={() => {
              selectSection(item);
            }}
          >
            Valgt: {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
