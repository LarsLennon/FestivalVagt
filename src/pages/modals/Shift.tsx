import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import { ShiftDTO } from "../../interface/interface";
import apiService from "../../services/api.service";
import AuthService from "../../services/auth.service"


interface BookingProps {
  isOpen: boolean;
  id: string;
  returnUrl: string;
  events: ShiftDTO[];
}

export default function Booking(props: BookingProps) {
  let itemInstance = {
    From: "Loading...",
    Pickedup: "Loading...",
    To: "Loading...",
    Returned: "Loading...",
    MemberName: "Loading...",
    MemberId: "Loading...",
    MemberPhone: "Loading...",
    TeamName: "Loading...",
    TeamId: "Loading...",
    CreatedBy: "Loading...",
  };
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const close = () => navigate(props.returnUrl);
  //const bookingId = parseInt(props.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const refetchData = () => {
    console.log("refetchData");

    apiService.getShift(2).then(
      (response) => {
        //setErrorMessage("");
        console.log("Response");
        console.log(response);
        setData(response.data);
        setLoading(false)
        // this.props.router.navigate("/profile");
        //   window.location.reload();
      }, (error) => {
        console.log(error);
      }
    );

    // BackendAPI("Booking")
    //   .getById(bookingId)
    //   .then((res) => {
    //     setData(res.data);
    //   });
  };


  const modalOpened = () => {
    //setData(itemInstance);
        setData(null);
        setLoading(true)
    refetchData();
    console.log(props.events)
    //let test = findArrayElementByTitle(props.events, 2)
     console.log("modalOpened")

    if(props.events != null)
    {
      let test =  props.events.find((element) => {
        return false;
      })

    }

  };

  const AcceptShift = () => {
    const response = apiService.acceptShift(parseInt(props.id), 2).then(
      () => {
        //setErrorMessage("");
        console.log("Response");
        // navigate("/profile")
        // this.props.router.navigate("/profile");
        //   window.location.reload();
      }, (error) => {
        console.log(error);
      }
    );

  };


  return (
    <div>
      <Modal onOpened={modalOpened} isOpen={props.isOpen} toggle={close}>
      <ModalHeader toggle={close}>
          Shift {props.id}
          </ModalHeader>
          
        {loading == false ?         
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
                <tr>
                  <td>Start</td>
                  <td>{}</td>
                </tr>
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
                  color="success"
                  onClick={AcceptShift}
                >
                  Tilmeld
                </Button>
              </div>
            </div>
          </ModalBody> ) : (    
        <ModalHeader toggle={close}>
          
        </ModalHeader>)}

        
      </Modal>
    </div>
  );
}


