import moment from "moment";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table, Alert, AccordionBody, Accordion, AccordionHeader, AccordionItem } from "reactstrap";
import { CalendarShiftDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import AuthService from "../../services/auth.service"


interface BookingProps {
  event: CalendarShiftDTO;
  isOpen: boolean;
  returnUrl: string;
  refetch: any;
  close: any;
}

export default function Booking(props: BookingProps) {

  const navigate = useNavigate();
  const [open, setOpen] = useState("1");
  const toggle = (id: any) => {
    if (open === id) {
      setOpen("0");
    } else {
      setOpen(id);
    }
  };
  const close = () => props.close();
  const [errorMessage, setErrorMessage] = useState("");

  const modalOpened = () => {
    console.log("modalOpened")
  };

  const AcceptShift = () => {
    const response = apiService.acceptShift(parseInt(props.event.shiftId)).then(
      () => {
        console.log("Response");
        props.refetch();
        navigate(props.returnUrl)
      }, (error) => {
        console.log(error);
      }
    );
  };


  const RemoveShift = () => {
    const response = apiService.removeShift(parseInt(props.event.shiftId)).then(
      () => {
        console.log("Response");
        props.refetch();
        navigate(props.returnUrl)
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

  const mapMembers = props.event.members.map((Member, index) => {
    return (
      <tr key={index}>
        <td>{Member.name}</td>
        <td>1</td>
        <td>1</td>
        <td><Button color="danger"><RiDeleteBinLine /></Button></td>
      </tr>
      // <li key={index}>
      //     {Member.name}
      // </li>
    );
  });

  return (
    <div>
      <Modal onOpened={modalOpened} isOpen={props.isOpen} toggle={close}>
        <ModalHeader toggle={close}>
          {/* {props.event.shiftId} */}
          {props.event.name}
        </ModalHeader>

        {props.event.conflict != 0 ? <Alert color="danger">Du kan ikke tage denne vagt. Kode: {props.event.conflict}</Alert> : ""}

        <ModalBody>
          Her kan vi skrive en masse tekst omkring hvad man skal v??re opm??rksom p?? under vagtet. Eller hvad denne vagt indeb??rer.
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
            </tbody>
          </Table>

          {/* <Table>
            <thead>
              <tr>
                <th>Medhj??lpere</th>
                <th>K??rekort</th>
                <th>Erfaren</th>
              </tr>
            </thead>
            <tbody>
              {mapMembers}
            </tbody>
          </Table> */}

{
          //@ts-ignore
          // <Accordion open={open} toggle={toggle}>
          //   <AccordionItem>
          //     <AccordionHeader targetId="1">Info</AccordionHeader>
          //     <AccordionBody accordionId="1">
          //       <Table>
          //         <thead>
          //           <tr>
          //             <th></th>
          //             <th></th>
          //           </tr>
          //         </thead>
          //         <tbody>
          //           <tr>
          //             <td>Status</td>
          //             <td>Status</td>
          //           </tr>
          //           <tr>
          //             <td>Bestillinger</td>
          //             <td>Bestillinger</td>
          //           </tr>
          //           <tr>
          //             <td>Bestilt til</td>
          //             <td>
          //               {" "}
          //               Platforme Op/Ned<br></br>
          //               Walthers VoV
          //             </td>
          //           </tr>
          //           <tr>
          //             <td>F??rste</td>
          //             <td>F??rste</td>
          //           </tr>
          //           <tr>
          //             <td>Sidste</td>
          //             <td>Sidste</td>
          //           </tr>
          //           <tr>
          //             <td>Bel??gning</td>
          //             <td>Alle 59 dage</td>
          //           </tr>
          //         </tbody>
          //       </Table>
          //     </AccordionBody>
          //   </AccordionItem>
          // </Accordion>
}
<br></br>
          <div className="d-flex justify-content-between">
            <Button
              className="m-1"
              color="secondary"
            // onClick={() => navigate(-1)}
            >
              Tilbage
            </Button>
            <div>
              <Button
                color="primary"
                className="float-right m-1"
              // onClick={() => navigate(props.returnUrl + "/edit/" + bookingId)}
              >
                Rediger
              </Button>

              <Button
                className="float-right m-1"
                color="danger"
                onClick={RemoveShift}
              >
                Afmeld
              </Button>

              <Button
                className="float-right m-1"
                color="success"
                onClick={AcceptShift}
              >
                Tilmeld
              </Button>
            </div>
          </div>
        </ModalBody>


      </Modal>
    </div>
  );
}


