import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Profile from "../../pages/Profile";
import Calendar from "../../pages/Calendar";
import CalendarDays from "../../pages/CalendarDays";
import CalendarTest from "../../pages/CalendarTest";
import ExampleEventComponent from "../exampleevent.component";
import authService from "../../services/auth.service";
import MyShifts from "../../pages/MyShifts";
import Members from "../../pages/Members";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const username = authService.getCurrentUsername();
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

          <NavLink href="/shifts" className="text-dark">
            Mine Vagter
          </NavLink>

        <NavLink href="/members" className="text-dark">
          Medhjælpere
        </NavLink>
        
          </Nav>
          <NavLink href="/login" className="text-dark">
            {username ? username : "Login"}
          </NavLink>
        </Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shifts" element={<MyShifts />} />
        <Route path="/members" element={<Members />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/test" element={<ExampleEventComponent />} />
        
        <Route
            path="/calendar/:time/"
            element={<Calendar/>}
          />
        <Route
            path="/calendar/:time/:index"
            element={<Calendar/>}
          />
          <Route
              path="/calendar/:time/:index/:modal/:modalid"
              element={<Calendar/>}
            />
      </Routes>
    </div>
  );
}
