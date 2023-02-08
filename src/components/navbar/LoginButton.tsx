import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  NavLink,
} from "reactstrap";
import { SectionDetailsDTO, SectionDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import { useGlobalContext } from "../../hooks/GlobalContent";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";


export default function LoginButton() {
  const navigate = useNavigate();


  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const renderButton = () => {
    if (authService.isAuth()) {
      return (
        <UncontrolledDropdown>
          <DropdownToggle className="text-dark" nav caret>
            {authService.getCurrentUsername()}
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={() => navigate("/members")}>Medhjælpere</DropdownItem>
            <DropdownItem onClick={() => navigate("/team")}>Hold</DropdownItem>    
            <DropdownItem onClick={() => navigate("/test")}>Test</DropdownItem> 
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    else {
      return (
        <NavLink href="/login" className="text-dark">
          Login
        </NavLink>
      );
    }
  };


  return (
    <div>{renderButton()}</div>


  );
}
