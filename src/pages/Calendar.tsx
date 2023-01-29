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


export default function Calendar() {
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
  const [shifts, setShifts] = useState(null);
  const id = 0;
  

  const reloadItemResources = () => {    
    const response = ApiService.getShifts().then(
      (response) => {
          //setErrorMessage("");
          //console.log(response);
              setShifts(response.data);
          // this.props.router.navigate("/profile");
          //   window.location.reload();
      })
  };

  useEffect(() => {
    reloadItemResources();
  }, [id]);


  const events =
    [{
      "ShiftId": 1,
      "Name": "VoV Skranke",
      "StartTime": "2021-06-19T08:15:00",
      "EndTime": "2021-06-19T19:00:00",
      "Slots": 5,
      "TimeFactor": 1,
      "SectionId": 1,
    }, {
      "ShiftId": 2,
      "Name": "VoV Skranke",
      "StartTime": "2021-06-19T08:15:00",
      "EndTime": "2021-06-19T19:00:00",
      "Slots": 5,
      "TimeFactor": 1,
      "SectionId": 1,
    }
    ];

  let currentIndex = 1;
  if (shifts != null) {

    if (index != null) {
      currentIndex = Number(index)
    }
    else {
      let shift: ShiftDTO = shifts[0];
      currentIndex = moment(shift.StartTime).week();
    }
    if (Number(index) > 100) {
      let shift: ShiftDTO = shifts[0];
      console.log("Month: " + moment(shift.StartTime).week()) // Month will output from 0-11}
    }
  }

  function RenderTimeSpan() {
    if (time == "week") {
      return (<CalendarWeek events={shifts!}></CalendarWeek>);
    }
    return (<CalendarMonth events={shifts!}></CalendarMonth>);
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