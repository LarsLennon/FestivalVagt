import './Calendar.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CalendarMonth from '../components/calendar.month';
import CalenderHeader from '../components/calendar.header';
import moment from 'moment';
import CalendarWeek from '../components/calendar.week';
import Shift from './modals/Shift';
import AuthService from "../services/auth.service"
import ApiService from '../services/api.service';
import { ShiftDTO } from '../interface/interface';
import { useGlobalContext } from '../hooks/GlobalContent';


export default function Calendar() {
  const { sectionId, setSectionId } = useGlobalContext();
  const { time, index, modal, modalid } = useParams();
  const returnUrl = "/calendar/" + time + "/" + index;
  console.log(time);
  let itemInstance = {
    header: "",
    status: "",
    from: "",
    to: "",
    bookingsCount: "",
    bookingPercentage: "",
    incidents: [],
  };
  const [shifts, setShifts] = useState([]);
  const id = 0;


  const reloadItemResources = () => {
    const response = ApiService.getShifts(sectionId).then(
      (response) => {
        //setErrorMessage("");
        //console.log(response);
        setShifts(response.data);

        // this.props.router.navigate("/profile");
        //   window.location.reload();
      })
  };

  useEffect(() => {
    if (sectionId != "") {
      reloadItemResources();
    }
  }, [sectionId]);


  let currentIndex = 1;
  if (shifts != null && shifts!.length > 0) {

    if (index != null) {
      currentIndex = Number(index)
    }
    else {
      let shift: ShiftDTO = shifts[0];
      currentIndex = moment(shift.startTime).week();
    }
    if (Number(index) > 100) {
      let shift: ShiftDTO = shifts[0];
      console.log("Month: " + moment(shift.startTime).week()) // Month will output from 0-11}
    }
  }

  function RenderTimeSpan() {
    if (shifts != null && shifts!.length > 0) {
      if (time == "week") {
        return (<CalendarWeek events={shifts!}></CalendarWeek>);
      }
      return (<CalendarMonth events={shifts!}></CalendarMonth>);
    }
    return (<h6>Ingen  vagter blev fundet</h6>);
  }

  const renderModal = () => {
    return (
      <div>
        <Shift
          isOpen={modal == "shift"}
          id={modalid ?? "0"}
          returnUrl={returnUrl}
          events={shifts!}
          refetch={reloadItemResources}
        />
      </div>
    );
  };

  return (
    <div>
      {renderModal()}
      {/* <p>{itemResources![0]}</p> */}
      <CalenderHeader index={currentIndex}></CalenderHeader>
      {RenderTimeSpan()}

    </div>
  );
}