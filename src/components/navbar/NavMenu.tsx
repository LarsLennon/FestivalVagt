import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { Routes, Route } from "react-router-dom";
// import Login from "../Login";
// import Profile from "../../pages/Profile";
// import Calendar from "../../pages/Calendar";
import authService from "../../services/auth.service";
// import MyShifts from "../../pages/MyShifts";
// import Members from "../../pages/Members";
// import Teams from "../../pages/admin/Teams";
// import TeamSync from "../../pages/admin/TeamSync";
// import Team from "../../pages/manage/Team";
// import SectionCreate from "../../pages/manage/Section.Create";
// import SectionDetails from "../../pages/manage/Section.Details";
// import SectionImport from "../../pages/manage/Section.Import";
// import SectionSelector from "./SectionSelector";
import LoginButton from "./LoginButton";
// import { ProtectedRoute } from "./ProtectedRoute ";
import SectionSelector from "./SectionSelector";
import Login from "../Login";
// import ExamplePage from "../../pages/ExamplePage";
// import MemberAttributes from "../../pages/MemberAttributes";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  //const username = authService.getCurrentUsername();

  const renderNavLinks = () => {
    if (authService.isAuth())
      return (
        <React.Fragment>

          <NavLink href="/calendar" className="text-dark">
            Kalender
          </NavLink>

          <NavLink href="/shifts" className="text-dark">
            Mine Vagter
          </NavLink>

          <SectionSelector></SectionSelector>
        </React.Fragment>
      );
      else
      {
        return (
          <React.Fragment>
  
            <NavLink href="/calendar" className="text-dark">
              BOGUS
            </NavLink>
          </React.Fragment>
        );
      }
  };


  return (
    <div>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand href="/calendar">SmukVagt</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {renderNavLinks()}


          </Nav>
          <LoginButton></LoginButton>
        </Collapse>
      </Navbar>

      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/lars" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/shifts" element={<ProtectedRoute><MyShifts /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
        <Route path="/team/sync" element={<ProtectedRoute><TeamSync /></ProtectedRoute>} />
        <Route path="/manage/team/:id" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="/manage/create/:id" element={<ProtectedRoute><SectionCreate /></ProtectedRoute>} />
        <Route path="/manage/section/:id" element={<ProtectedRoute><SectionDetails /></ProtectedRoute>} />
        <Route path="/manage/import/:id" element={<ProtectedRoute><SectionImport /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/test" element={<MemberAttributes />} /> */}


      </Routes>
    </div>
  );
}
