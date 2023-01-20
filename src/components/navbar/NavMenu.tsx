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

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);


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

          </Nav>
          <NavLink href="/login" className="text-dark">
            Admin Text
          </NavLink>
        </Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        
        <Route
            path="/calendar/:time/"
            element={<Calendar/>}
          />
        <Route
            path="/calendar/:time/:index"
            element={<Calendar/>}
          />
          <Route
              path="/calendar/:time/:index/:modal/:id"
              element={<Calendar/>}
            />
      </Routes>
    </div>
  );
}
