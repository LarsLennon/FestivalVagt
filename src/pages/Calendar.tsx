import './Calendar.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CalenderHeader from '../components/calendar.header';
import moment from 'moment';
import Shift from './modals/Shift';
import ApiService from '../services/api.service';
import { ShiftDTO } from '../interface/interface';
import { useGlobalContext } from '../hooks/GlobalContent';
import { Container, Table } from 'reactstrap';
import React from 'react';
import EventComponent from '../components/event.component';


export default function Calendar() {
  const { sectionId, calendarTimeline, calendarDate, setCalendarDate } = useGlobalContext();
  const { time, index, modal, modalid } = useParams();
  const [firstShiftDate, setFirstShiftDate] = useState("");
  const [lastShiftDate, setLastShiftDate] = useState("");
  const returnUrl = "/calendar/" + time + "/" + index;

  const weekdays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

  const [apiData, setApiData] = useState<ShiftDTO[]>([]);
  const getShifts = () => {
    const response = ApiService.getShifts(sectionId).then(
      (response) => {
        setApiData(response.data);
        //console.log(response.data)
        const shiftsResponse: ShiftDTO[] = response.data;
        if (shiftsResponse.length > 0) {
          var first = moment(shiftsResponse[0].startTime!).format("yyyy-MM-DD");
          var last = moment(shiftsResponse[shiftsResponse.length - 1].endTime!).format("yyyy-MM-DD");
          setFirstShiftDate(first);
          setLastShiftDate(last);
          var m = moment(calendarDate);
          if(m.isValid())
          {
            var year = moment(first).year();
            var newDate = moment(calendarDate).set('year', year);
            console.log("(m == null")
            setCalendarDate(newDate.format("yyyy-MM-DD"));
          }
          else
          {
            setCalendarDate(first);
          }
          // calendarDate()
          
          console.log(shiftsResponse[shiftsResponse.length - 1].endTime)
        }
      })
  };

  useEffect(() => {
    if (sectionId != "") {
      getShifts();
    }
  }, [sectionId]);


  const calenderEndDate = () => {
    if(calendarTimeline == "month")
    {
      return moment(calendarDate).add(1, 'month').add(7, 'days').add(12, 'hours');
    }
    else if(calendarTimeline == "week")
    {
      return moment(calendarDate).add(7, 'days').add(12, 'hours');
    }
    return moment(lastShiftDate).add(7, 'days').add(12, 'hours');
  };


  const calenderStartDate = () => {
    if(calendarTimeline == "month")
    {
      return moment(calendarDate).startOf('month').day("Monday");
    }
    else if(calendarTimeline == "week")
    {
      return moment(calendarDate).day("Monday");
    }
    return moment(firstShiftDate).day("Monday");
  };




  let days = [];
  // Loop through week
  // let a = moment(firstShiftDate).day("Monday").week(parseInt(index!)); // Get first day of week
  // let a = moment(firstShiftDate);//.day("Monday").week(parseInt(index!)); // Get first day of week
  //let a = momene; //moment(firstShiftDate).day("Monday");//.week(parseInt(index!)); // Get first day of week
  // let b = moment(a).add(7, 'days');
  // let b = moment(lastShiftDate);
  let a = calenderStartDate(); // moment(calendarDate).day("Monday");//.week(parseInt(index!)); // Get first day of week
  let b = calenderEndDate();//moment(lastShiftDate).add(7, 'days').add(12, 'hours');
  for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
    let dayOfWeek = parseInt(m.format('d'));
    let noShifts = true;
    //console.log(m.format('YYYY-MM-DD'))

    const filteredEvents = apiData.filter(event => moment(event.startTime).isSame(m, 'day'));

    days.push(
      <React.Fragment key={m.format('YYYY-MM-DD')}>
        <div className='w-100 d-md-none'></div>
        <div className="col-md-3 col-xl nopadding m-1 mt-4">
          <h4>{weekdays[dayOfWeek]} {m.format('DD/MM')}</h4>

          {filteredEvents.length > 0 ? (
            filteredEvents.map(todaysEvent => (
            
              <div key={todaysEvent.shiftId}>
                  <EventComponent event={todaysEvent} returnUrl={returnUrl}></EventComponent>
              </div>
          ))) : (
            <div>
              Ingen vagter
            </div>
          )}

        </div>
      </React.Fragment>);
  }

  const renderModal = () => {
    return (
      <div>
        <Shift
          isOpen={modal == "shift"}
          id={modalid ?? "0"}
          returnUrl={returnUrl}
          events={apiData!}
          refetch={getShifts}
        />
      </div>
    );
  };


  var rows: any[] = [];
  let cells: Array<any> = [];
  days.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
  });

  let mapRows = rows.map((d: any, index: any) => {
    return (
      <div className="row" key={index+1000}>
        {d}
      </div>);
  });

  return (
    <div>
      {renderModal()}
      <CalenderHeader firstShiftDate={firstShiftDate} lastShiftDate={lastShiftDate}></CalenderHeader>
      <div>
        <Container fluid>
          {mapRows}
        </Container>

      </div>
    </div>
  );
}