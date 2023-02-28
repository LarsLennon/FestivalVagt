import moment from "moment";
import { useState } from "react";
import { List } from "reactstrap";
import { CalendarShiftDTO } from "../interface/interface";
import conflict from "./conflics";
import CalendarShiftModal from "../pages/Calendar.ShiftModal";

interface Iprops {
    event: CalendarShiftDTO;
    refresh: Function;
}

export default function EventComponent(props: Iprops) {
    const [eventInfoModal, setEventInfoModal] = useState(false);

    const emptySlots = props.event.slots! - props.event.members.length;
    let blanks = [];
    for (let d = 1; d <= (emptySlots); d++) {

        blanks.push("");
    }

    const mapblanks = blanks.map((Member, index) => {

        return (
            <li key={index}>
                {Member}
            </li>
        );
    });

    const mapMembers = props.event.members.map((Member, index) => {

        return (
            <li key={index}>
                {Member.name}
            </li>
        );
    });

    const eventBoxColor = () => {
        if (props.event.myShift) return "event-myshift";
        return "";
    };

    const eventBoxBorderColor = () => {
        if (props.event.conflict != null && props.event.conflict > 0) return "event-conflict";
        return "event-box";
    };

    const handleClose = () => {
        console.log("Close");
        setEventInfoModal(false);
        //props.refresh();
    };

    const Test = () => {
        console.log("REFETCH");
        props.refresh();
    };

    const renderModal = () => {
        return (
            <div>
                <CalendarShiftModal
                    event={props.event}
                    isOpen={eventInfoModal}
                    returnUrl={""}
                    refetch={Test}
                    close={handleClose}
                />
            </div>
        );
    };

    const renderHelperText = () => {
        let conflictText = conflict(props.event.conflict!);
        const myShift = props.event.myShift;

        if(conflictText === "" || myShift)
        {
            if(emptySlots === 1) {
                conflictText = emptySlots + " ledig plads";
            } else {
                conflictText = emptySlots + " ledige pladser";
            }
        }

        return (
            <div className="shiftprogresstext">
                {conflictText}
            </div>
        );
    };
    // const ifWeekend = (moment(props.event.startTime).day() === 0) || (moment(props.event.startTime).day() === 6);

    return (
        <div>
            {renderModal()}
            <div key={props.event.shiftId} className="row event-row">
                <div className="col">
                    <div className={eventBoxBorderColor() + " " + eventBoxColor()} onClick={() => setEventInfoModal(true)}>
                        <div className="event-link active">
                            {props.event.allDay ? "" : (
                                <div>

                                    <span className="font-weight-bold"><b>{moment(props.event.startTime).format("HH:mm")} - {moment(props.event.endTime).format("HH:mm")}</b> ({props.event.units.toFixed(1)}t) </span>

                                    {/* <Badge className="" color="info">
                                        {props.event.units}
                                    </Badge> */}
                                    {renderHelperText()}
                                </div>
                            )}
                            <span className="font-weight-bold">{props.event.name}</span>
                            <div className="event-list">
                                <List>
                                    {mapMembers}
                                    {mapblanks}
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}