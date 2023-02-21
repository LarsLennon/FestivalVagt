import moment from "moment";
import { useState } from "react";
import { List } from "reactstrap";
import { CalendarShiftDTO } from "../interface/interface";
import conflict from "./conflics";
import Shift from "./modals/Shift";

interface Iprops {
    event: CalendarShiftDTO;
    refresh: Function;
}

export default function EventComponent(props: Iprops) {
    const [eventInfoModal, setEventInfoModal] = useState(false);

    let blanks = [];
    for (let d = 1; d <= (props.event.slots! - props.event.members.length); d++) {

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
        props.refresh();
    };

    const Test = () => {
        console.log("REFETCH");
        props.refresh();
    };

    const renderModal = () => {
        return (
            <div>
                <Shift
                    event={props.event}
                    isOpen={eventInfoModal}
                    returnUrl={""}
                    refetch={Test}
                    close={handleClose}
                />
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

                        <div title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                            <span className="font-weight-bold sm">{props.event.name}</span><br></br>
                            {props.event.name === "Bagvagt" || props.event.name === "Ansvarlig" ? "" : (
                                <div>
                                    <span className="font-weight-bold sm"><b>{moment(props.event.startTime).format("HH:mm")} - {moment(props.event.endTime).format("HH:mm")} </b></span>
                                    {/* <ProgressAvailable total={props.event.slots!} occupied={props.event.members.length}></ProgressAvailable> */}
                                    <div className="shiftprogresstext">
                                        {conflict(props.event.conflict!)}
                                    </div>
                                </div>
                            )}
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