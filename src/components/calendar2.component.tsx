import '../pages//Calendar.css';
import moment from "moment";
import React from "react";
import { Badge, Table } from "reactstrap";
import EventComponent from './event.component';
import CalenderHeader from './calendar.header';

export interface IFooBar {
    ShiftId?: number;
    Name?: string;
    Slots?: number;
    StartTime?: string;
    EndTime?: string;

}
interface Iprops {
    events: IFooBar[];

}

export default function CalendarMonth2(props: Iprops) {

    if (props.events == null) return (null);

    let mDateObject = moment("2023-02-01")

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

    // Loop through week
    let a = moment("2021-06-19").day("Monday").week(30); // Get first day of week
    let b = moment(a).add(7, 'days');
    for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {

        days.push(
            <React.Fragment key={m.format('YYYY-MM-DD')}>
                <td key={m.format('YYYY-MM-DD')} className="event-td">
                    <span className="date_my">{m.format('DD/MM')}</span>
                    {props.events.filter(event => moment(event.StartTime).isSame(m, 'day')).map(todaysEvent => (
                        <div key={todaysEvent.ShiftId}>
                            <EventComponent event={todaysEvent}></EventComponent>
                        </div>
                    ))}
                </td>
            </React.Fragment>);
    }

    const renderEvents = days.map((ShiftId, index) => {
        return (
            <React.Fragment key={index}>
                {ShiftId}
            </React.Fragment>
        );
    });


    return (

        <div>
            <CalenderHeader></CalenderHeader>
            <Table>

                <thead>
                    <tr>{weekdayshortname}</tr>
                </thead>

                <tbody>
                    <tr>{renderEvents}</tr>
                </tbody>

            </Table>
        </div>

    );


}