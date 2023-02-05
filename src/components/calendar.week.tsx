import '../pages//Calendar.css';
import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Table } from "reactstrap";
import EventComponent from './event.component';
import CalenderHeader from './calendar.header';
import { useParams } from 'react-router-dom';
import { ShiftDTO } from '../interface/interface';

interface Iprops {
    events: ShiftDTO[];

}

export default function CalendarWeek(props: Iprops) {
    const { time, index } = useParams();
    const returnUrl = "/calendar/" + time + "/" + index;

    if (props.events == null) return (null);

    //let mDateObject = moment("2023-02-01")

    const weekdays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const weekdayshort = moment.weekdaysShort();

    const weekdayshortname = weekdays.map((day, index) => {
        return (
            <th key={day} className="week-day">
                {day}
            </th>
        );
    });

    let days = [];
    let Newdays = [];

    // Loop through week
    let a = moment("2021-06-19").day("Monday").week(parseInt(index!)); // Get first day of week
    let b = moment(a).add(7, 'days');
    for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {

        days.push(
            <React.Fragment key={m.format('YYYY-MM-DD')}>
                <td key={m.format('YYYY-MM-DD')} className="event-td">
                    <span className="date_my">{m.format('DD/MM')}</span>
                    {props.events.filter(event => moment(event.StartTime).isSame(m, 'day')).map(todaysEvent => (
                        <div key={todaysEvent.ShiftId}>
                            <EventComponent event={todaysEvent} returnUrl={returnUrl}></EventComponent>
                        </div>
                    ))}
                </td>
            </React.Fragment>);
    }

    for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {

        Newdays.push(
            <React.Fragment key={m.format('YYYY-MM-DD')}>
                    <div className='w-100 d-md-none'></div>
                    <div className="col nopadding">
                        <h4>{m.format('DD/MM')}</h4>
                    {props.events.filter(event => moment(event.StartTime).isSame(m, 'day')).map(todaysEvent => (
                        <div key={todaysEvent.ShiftId}>
                            <EventComponent event={todaysEvent} returnUrl={returnUrl}></EventComponent>
                        </div>
                    ))}
                    </div>
            </React.Fragment>);
    }

    const renderEvents = days.map((ShiftId, index) => {
        return (
            <React.Fragment key={index}>
                {ShiftId}
            </React.Fragment>
        );
    });

    const renderNewEvents = Newdays.map((ShiftId, index) => {
        return (
            <React.Fragment key={index}>
            {ShiftId}
            </React.Fragment>
        );
    });

    return (

        <div>

            <Container fluid>

                <div className="row">
                {renderNewEvents}
                </div>
            </Container>

        </div>

    );


}