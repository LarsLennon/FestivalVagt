import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table, Alert, Form, FormGroup, Input, Label } from "reactstrap";
import conflict, { ConflictType } from "../components/conflics";
import { useGlobalContext } from "../hooks/GlobalContent";
import { CalendarShiftDTO, MyShiftsDTO, ShiftDTO, ShiftExchangeDTO } from "../interface/interface";
import apiService from "../services/api.service";
import authService from "../services/auth.service";


interface BookingProps {
  event: CalendarShiftDTO;
  isOpen: boolean;
  returnUrl: string;
  refetch: any;
  close: any;
}

export default function CalendarShiftModal(props: BookingProps) {
  const navigate = useNavigate();
  const { sectionId } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");

  // const [open, setOpen] = useState("1");
  // const toggle = (id: any) => {
  //   if (open === id) {
  //     setOpen("0");
  //   } else {
  //     setOpen(id);
  //   }
  // };
  const close = () => props.close();

  const modalOpened = () => {
    setLoading(true);
    setValidShift(false);
    setErrorMessage("");
    if (props.event.conflict === ConflictType.TooManyShifts) {
      loadApiData();
    }
  };

  const AcceptShift = () => {
    apiService.acceptShift(parseInt(props.event.shiftId)).then(
      () => {
        props.refetch();
        close();
        //navigate(props.returnUrl)
      },
      error => {
        // setLoading(false);
        props.refetch();
        setErrorMessage("Ukendt fejl, kontakt Lars");
        if (error.response.data > 0) setErrorMessage(conflict(error.response.data));
        // setErrorMessage(error.response.data);
      }
    );
  };

  const RemoveShift = () => {
    apiService.removeShift(parseInt(props.event.shiftId)).then(
      () => {
        props.refetch();
        close();
        //navigate(props.returnUrl)
      }, (error) => {
        console.log(error);
      }
    );
  };

  const [removeShiftId, setRemoveShiftId] = useState(0);
  const [validShift, setValidShift] = useState(false);
  const handleExchangeShift = () => {
    const data: ShiftExchangeDTO = {
      addShiftId: parseInt(props.event.shiftId),
      removeShiftId: removeShiftId!
    };
    apiService.exchangeShift(data).then(
      () => {
        props.refetch();
        close();
      },
      error => {
        // setLoading(false);
        props.refetch();
        setErrorMessage("Error");
        console.log(error)
        if (error.response.data != "") setErrorMessage(error.response.data);
        // setErrorMessage(error.response.data);
      })

  };

  const tableRow = (label: string, value: string) => {
    return (
      <tr>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    );
  };

  var stringConflict = conflict(props.event.conflict!);
  var stringShiftConflict = conflict(props.event.shiftConflict!);

  const adminInfo = () => {
    if (!authService.isManager() || true) { // ToDo Disabled
      return "";
    }
    return (
      <React.Fragment>
        {tableRow("Id", props.event.shiftId)}
        {tableRow("Antal vagter", props.event.slots!.toString())}
        {tableRow("Chauffører", props.event.reqDrivers!)}
        {tableRow("Erfarne", props.event.reqExperienced!)}
        {tableRow("Tidsfaktor", props.event.timeFactor!.toString())}
        {tableRow("Prioritet", props.event.priority!.toString())}
      </React.Fragment>
    );
  };

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<MyShiftsDTO>();
  const loadApiData = () => {
    apiService.getMembersShifts(sectionId).then(
      (response) => {
        setApiData(response.data);
        console.log(response.data);
      })
  };


  const onChangeShift = (event: any) => {
    console.log(event.target.value);
    setValidShift(true);
    setRemoveShiftId(event.target.value);
  }

  const mapShifts = apiData?.shifts.map((shift: ShiftDTO, index: number) => {
    return (
      <option key={index} value={shift.shiftId}>
        {shift.name}
      </option>
    );
  });


  const exchangeInfo = () => {
    if (props.event.conflict !== ConflictType.TooManyShifts  || (props.event.shiftConflict !== 0)) {

      return (props.event.conflict);
    }
    return (
      <Form>
        <FormGroup>
          <Label for="exampleSelect">
            Du har for mange vagter, vælg en vagt du vil afgive
          </Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={onChangeShift}
          >
            <option>
              Vælg en vagt!
            </option>
            {mapShifts}
          </Input>
        </FormGroup>
      </Form>
    );
  };

  const renderAcceptRemoveButton = () => {
    // if (!authService.isManager()) {
    //   return "";
    // }
    const disabled = (props.event.conflict !== 0) || (props.event.shiftConflict !== 0);
    // const disabled = false;
    if (props.event.myShift) {
      return (
        <Button
          className="float-right m-1"
          color="danger"
          onClick={RemoveShift}
        >
          Afmeld
        </Button>
      );
    }
    else {
      return (
        <Button
          className="float-right m-1"
          color="success"
          onClick={AcceptShift}
          disabled={disabled}
        >
          Tilmeld
        </Button>);
    }
  }

  return (
    <div>
      <Modal onOpened={modalOpened} isOpen={props.isOpen} toggle={close}>
        <ModalHeader toggle={close}>
          {/* {props.event.shiftId} */}
          {props.event.name}
        </ModalHeader>

        {stringConflict !== "" ? <Alert color="danger">{stringConflict}</Alert> : ""}
        {stringShiftConflict !== "" ? <Alert color="danger">{stringShiftConflict}</Alert> : ""}
        {errorMessage !== "" ? <Alert color="danger">{errorMessage}</Alert> : ""}

        <ModalBody>
          {props.event.description !== "" ? props.event.description : ""}
          <Table>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableRow("Start", moment(props.event.startTime).format("HH:mm D/MM/YY"))}
              {tableRow("Slut", moment(props.event.endTime).format("HH:mm D/MM/YY"))}

              {adminInfo()}
            </tbody>
          </Table>
          {exchangeInfo()}

          <br></br>
          <div className="d-flex justify-content-between">
            <Button
              className="m-1"
              color="secondary"
              onClick={close}
            >
              Tilbage
            </Button>
            <div>
              {authService.isAdmin() ?
                <Button
                  color="primary"
                  className="float-right m-1"
                  onClick={() => navigate("/shift/details/" + props.event.shiftId)}
                >
                  Detaljer
                </Button> : ""}
              {/* {authService.isAdmin() ?
                <Button
                  color="warning"
                  className="float-right m-1"
                  onClick={() => navigate("/shift/details/" + props.event.shiftId)}
                >
                  Venteliste
                </Button> : ""} */}
              {(props.event.conflict === ConflictType.TooManyShifts) && (props.event.shiftConflict == 0) ?
                <Button
                  color="warning"
                  className="float-right m-1"
                  onClick={() => handleExchangeShift()}
                  disabled={!validShift}
                >
                  Byt
                </Button> : ""}
              {renderAcceptRemoveButton()}
            </div>
          </div>
        </ModalBody>


      </Modal>
    </div>
  );
}


