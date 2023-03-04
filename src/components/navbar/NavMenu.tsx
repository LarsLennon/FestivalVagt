import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { Routes, Route } from "react-router-dom";
import authService from "../../services/auth.service";
import LoginButton from "./LoginButton";
import { ProtectedAdminRoute, ProtectedManagerRoute, ProtectedRoute } from "./ProtectedRoute ";
import SectionSelector from "./SectionSelector";
import Login from "../../pages/Login";
import Teams from "../../pages/Teams";
import TeamSync from "../../pages/TeamSync";
import Calendar from "../../pages/Calendar";
import SectionCreate from "../../pages/Section.Create";
import SectionDetails from "../../pages/Section.Details";
import SectionImport from "../../pages/Section.Import";
import Team from "../../pages/Team";
import MemberAttributes from "../../pages/MemberAttributes";
import Members from "../../pages/Members";
import MemberShifts from "../../pages/Member.Shifts";
import Profile from "../../pages/Profile";
import { useGlobalContext } from "../../hooks/GlobalContent";
import SectionEdit from "../../pages/Section.Edit";
import Home from "../../pages/Home";
import ManageButton from "./ManageButton";
import Unauthorized from "../../pages/Unauthorized";
import ShiftTypeCreate from "../../pages/ShiftType.Create";
import Statistics from "../../pages/Statistics";
import ShiftDetails from "../../pages/Shift.Details";

export default function NavMenu() {
  const { setUserName } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    console.log("Effect!!!");
  }, [setUserName]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderNavLinks = () => {
    console.log(authService.isAuth());
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
    return;
  };

  const refresh = (isAuth: boolean) => {
    //setIsAuth(isAuth);
  }

  console.log(authService.isAuth());
  return (
    <div>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand href="/">SmukVagt</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {renderNavLinks()}
            <ManageButton></ManageButton>


          </Nav>
          <LoginButton refresh={refresh}></LoginButton>
        </Collapse>
      </Navbar>

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Authorized */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/attributes" element={<ProtectedRoute><MemberAttributes /></ProtectedRoute>} />
        <Route path="/shifts" element={<ProtectedRoute><MemberShifts /></ProtectedRoute>} />

        {/* Manager */}
        <Route path="/members" element={<ProtectedManagerRoute><Members /></ProtectedManagerRoute>} />
        <Route path="/statistics" element={<ProtectedManagerRoute><Statistics /></ProtectedManagerRoute>} />
        <Route path="/shift/details/:id" element={<ProtectedManagerRoute><ShiftDetails /></ProtectedManagerRoute>} />

        {/* Admin */}
        <Route path="/team" element={<ProtectedAdminRoute><Teams /></ProtectedAdminRoute>} />
        <Route path="/team/sync" element={<ProtectedAdminRoute><TeamSync /></ProtectedAdminRoute>} />
        <Route path="/manage/team/:id" element={<ProtectedAdminRoute><Team /></ProtectedAdminRoute>} />
        <Route path="/manage/create/:id" element={<ProtectedAdminRoute><SectionCreate /></ProtectedAdminRoute>} />
        <Route path="/manage/section/:id" element={<ProtectedAdminRoute><SectionDetails /></ProtectedAdminRoute>} />
        <Route path="/manage/section/edit/:id" element={<ProtectedAdminRoute><SectionEdit /></ProtectedAdminRoute>} />
        <Route path="/manage/import/:id" element={<ProtectedAdminRoute><SectionImport /></ProtectedAdminRoute>} />
        <Route path="/ShiftType/Create/:id" element={<ProtectedAdminRoute><ShiftTypeCreate /></ProtectedAdminRoute>} />

        {/* Test */}
        <Route path="/lars" element={<ProtectedAdminRoute><Profile /></ProtectedAdminRoute>} />
        <Route path="/profile" element={<ProtectedAdminRoute><Profile /></ProtectedAdminRoute>} />

      </Routes>
    </div>
  );
}
