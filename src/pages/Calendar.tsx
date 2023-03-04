import './css/Calendar.css';
import { useEffect, useState } from 'react';
import CalenderHeader from '../components/calendar.header';
import moment from 'moment';
import apiService from '../services/api.service';
import { CalendarDTO } from '../interface/interface';
import { useGlobalContext } from '../hooks/GlobalContent';
import { Alert, Container } from 'reactstrap';
import React from 'react';
import EventComponent from '../components/event.component';
import { useNavigate } from 'react-router-dom';


export default function Calendar() {
  const navigate = useNavigate();
  const { sectionId, calendarTimeline, calendarDate, setCalendarDate } = useGlobalContext();
  const [firstShiftDate, setFirstShiftDate] = useState("");
  const [lastShiftDate, setLastShiftDate] = useState("");

  const weekdays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<CalendarDTO>();
  const loadApiData = () => {
    if (sectionId !== "") {
      apiService.getShifts(sectionId).then(
        (response) => {
          setLoading(false);
          setApiData(response.data);
          const calendarDTO: CalendarDTO = response.data;

          if (calendarDTO.requireAttributes) {
            navigate("/attributes")
          }
          console.log(calendarDTO); // TODO
          if (calendarDTO.shifts.length > 0) {
            var first = moment(calendarDTO.shifts[0].startTime!).format("yyyy-MM-DD");
            var last = moment(calendarDTO.shifts[calendarDTO.shifts.length - 1].endTime!).format("yyyy-MM-DD");
            setFirstShiftDate(first);
            setLastShiftDate(last);
            var m = moment(calendarDate);
            if (m.isValid()) {
              var year = moment(first).year();
              var newDate = moment(calendarDate).set('year', year);
              setCalendarDate(newDate.format("yyyy-MM-DD"));
            }
            else {
              setCalendarDate(first);
            }
          }
        })
    }
  };

  useEffect(() => {
    loadApiData();
  }, [sectionId]); // eslint-disable-line react-hooks/exhaustive-deps


  const calenderEndDate = (currentStartDate: any) => {
    if (calendarTimeline === "month") {
      return moment(currentStartDate).add(1, 'month').add(7, 'days').add(12, 'hours');
    }
    else if (calendarTimeline === "week") {
      return moment(currentStartDate).add(7, 'days').add(12, 'hours');
    }
    return moment(lastShiftDate).add(7, 'days').add(12, 'hours');
  };


  const calenderStartDate = () => {
    if (calendarTimeline === "month") {
      return moment(calendarDate).startOf('month').day("Monday");
    }
    else if (calendarTimeline === "week") {
      return moment(calendarDate).day("Monday");
    }
    return moment(firstShiftDate).day("Monday");
  };



  let a = calenderStartDate();
  let b = calenderEndDate(a);

  let days = [];
  let filteredAllDayEvents;
  let filteredEvents;
  if (apiData != null) {
    for (let m = moment(a); m.isBefore(b); m.add(1, 'days')) {
      let dayOfWeek = parseInt(m.format('d'));
      filteredAllDayEvents = apiData!.shifts.filter(event => moment(event.startTime).isSame(m, 'day') && event.allDay);
      filteredEvents = apiData!.shifts.filter(event => moment(event.startTime).isSame(m, 'day') && !event.allDay);

      days.push(
        <React.Fragment key={m.format('YYYY-MM-DD')}>
          {dayOfWeek === 1 ? <div className="head_color"><h2 className="headertext">Uge {moment(m).week()}</h2></div> : ""}
          <div className='w-100 d-md-none '></div>
          <div className="col-xs col-sm col-md-3 col-lg col-xl nopadding">
            <h4>{weekdays[dayOfWeek]} {m.format('DD/MM')}</h4>

            {filteredAllDayEvents.length > 0 ? (
              filteredAllDayEvents.map(todaysEvent => (

                <div key={todaysEvent.shiftId}>
                  <EventComponent event={todaysEvent} refresh={loadApiData}></EventComponent>
                </div>
              ))) : ""}

            {filteredEvents.length > 0 ? (
              filteredEvents.map(todaysEvent => (

                <div key={todaysEvent.shiftId}>
                  <EventComponent event={todaysEvent} refresh={loadApiData}></EventComponent>
                </div>
              ))) : ""}

            {(filteredAllDayEvents.length === 0 && filteredEvents.length === 0) ? (
              <div>
                Ingen vagter
              </div>
            ) : ""}
          </div>
        </React.Fragment>);
    }
  }



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
      <div className="row" key={index + 1000}>
        {d}
      </div>);
  });

  if (isLoading) {
    return (
      <Container>
    <Alert color="warning">Loading...</Alert>
    </Container>
    );
  }
  else {
    return (
      <div>
        <Container>
          {!apiData?.isOpen ? <Alert color="danger">Vagtplanen er lukket!</Alert> : ""}
        </Container>
        <CalenderHeader firstShiftDate={firstShiftDate} lastShiftDate={lastShiftDate} sectionName={apiData?.name!} units={apiData ? apiData.units : 0}></CalenderHeader>
        <div>
          <Container fluid>
            {mapRows}
          </Container>

        </div>
      </div>
    );
  }
}