import '../pages//Calendar.css';
import moment from "moment";
import React from "react";
import { Badge, Table } from "reactstrap";

export default function CalendarMonth() {

    let mDateObject = moment("2023-02-01")


    const weekdayshort = moment.weekdaysShort();

    const weekdayshortname = weekdayshort.map((day, index) => {
        return (
            <th key={index+400} className="week-day">
                {day}
            </th>
        );
    });

    const firstDayOfMonth = (): number => {
        let dateObject = mDateObject;
        let firstDay = moment(dateObject).startOf("month").format("d");
        return +firstDay;
    };

    let test: Array<Element> = [];
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(
            <td className="calendar-day empty">{""}</td>
        );

    }


    let daysInMonth = [];
    for (let d = 1; d <= 30; d++) {
        daysInMonth.push(

            <td key={d+100} className="event-td">
                <span className="date_my">{d}/1</span>
                <div className="row event-row">
                    <div className="col">
                        <div className="event-box">
                            <a title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                                <span className="font-weight-bold sm">8:30 - 12:00 VoV-P</span>
                                <div><Badge color="success">2 ledige vagter</Badge></div>
                                <div>Lars Jensen</div>
                                {/* @if (item.ShiftGroup != null)
                                                                {
                                                                    <div>Team: @item.ShiftGroup.Name</div>
                                                                }
                                                                @foreach (var member in item.Members)
                                                                {
                                                                    <div>@member.Name</div>
                                                                }
                                                                @for (int n = item.Members.Count(); n < item.Slots; n++)
                                                                {

                                                                    <div><span className="badge badge-success">Ledig Vagt!</span></div>
                                                                } */}
                            </a>
                        </div>
                    </div>
                </div>
            </td>
        );
    }
    var totalSlots = [...blanks, ...daysInMonth];

    var rows: any[] = [];

    let cells: Array<any> = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row); // if index not equal 7 that means not go to next week
        } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows
            cells = []; // empty container
            cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
            rows.push(cells);
        }
    });

    let daysinmonth = rows.map((d: any, index: any) => {
        return <tr key={d}>{d}</tr>;
    });

    return (

        <div>

            <h2>{mDateObject.month()}</h2>
            
            <Table hover>

                <thead>

                    <tr>{weekdayshortname}</tr>

                </thead>

                <tbody>{daysinmonth}</tbody>

            </Table>
        </div>

    );


}