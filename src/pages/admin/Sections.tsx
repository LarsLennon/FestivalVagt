import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { ShiftDTO } from "../../interface/interface";


interface IFooBar {
  username?: string;
}
export default function Sections() {

  const [shifts, setShifts] = useState<ShiftDTO[]>([]);
  const loadApiData = () => {
    const response = apiService.getShifts().then(
      (response) => {
        setShifts(response.data);
      })
  };
  useEffect(() => {
    loadApiData();
  }, []);

  return (
    <div>
      <h2>Profile </h2>


    </div>

  );
}
