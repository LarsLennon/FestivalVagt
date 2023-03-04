import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Modal, ModalHeader, ModalBody, Table, Alert } from "reactstrap";
import conflict from "../components/conflics";
import { CalendarShiftDTO } from "../interface/interface";
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
    console.log("modalOpened")
  };

  const AcceptShift = () => {
    apiService.acceptShift(parseInt(props.event.shiftId)).then(
      () => {
        console.log("Response");
        props.refetch();
        close();
        //navigate(props.returnUrl)
      },
      error => {
          // setLoading(false);
          setErrorMessage("Error");
          if(error.response.data > 0) setErrorMessage(conflict(error.response.data));
          // setErrorMessage(error.response.data);
      }
    );
  };

  const RemoveShift = () => {
    apiService.removeShift(parseInt(props.event.shiftId)).then(
      () => {
        console.log("Response");
        props.refetch();
        close();
        //navigate(props.returnUrl)
      }, (error) => {
        console.log(error);
      }
    );
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
    if (!authService.isManager()) {
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
    } else {
      
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
                {renderAcceptRemoveButton()}
              </div>
            </div>
          </ModalBody>


        </Modal>
      </div>
    );
  }


