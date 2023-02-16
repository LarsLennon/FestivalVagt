import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table, Alert } from "reactstrap";
import { ShiftDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import AuthService from "../../services/auth.service"


interface BookingProps {
  isOpen: boolean;
  id: string;
  returnUrl: string;
  refetch: any;
  close: any;
}

export default function Booking(props: BookingProps) {

  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const close = () => props.close();
  //const bookingId = parseInt(props.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const refetchData = () => {
    console.log("refetchData");

    apiService.getShift(2).then(
      (response) => {
        setData(response.data);
        setLoading(false)
        setErrorMessage("");
      }, (error) => {
        console.log(error);
        setErrorMessage(error.message);
      }
    );
  };


  const modalOpened = () => {
    setData(null);
    setLoading(true)
    refetchData();
    //console.log(props.events)
    console.log("modalOpened")


  };

  const AcceptShift = () => {
    const response = apiService.acceptShift(parseInt(props.id)).then(
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
    const response = apiService.removeShift(parseInt(props.id)).then(
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


  return (
    <div>
      <Modal onOpened={modalOpened} isOpen={props.isOpen} toggle={close}>
        <ModalHeader toggle={close}>
          Shift {props.id}
        </ModalHeader>

        {errorMessage != "" ? <Alert color="danger">{errorMessage}</Alert> : ""}
        {loading ? <Alert color="danger">Loading!</Alert> : ""}
        {!loading ?
          (
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableRow("Start", "Test")}
                </tbody>
              </Table>

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
            </ModalBody>) : (
            <ModalHeader >

            </ModalHeader>)}


      </Modal>
    </div>
  );
}


