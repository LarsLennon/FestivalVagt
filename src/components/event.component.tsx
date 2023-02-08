import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Progress } from "reactstrap";
import { CalendarShiftDTO } from "../interface/interface";
import Shift from "../pages/modals/Shift";
import ProgressAvailable from "./progress.available";

interface Iprops {
    event: CalendarShiftDTO;
    returnUrl: string;
}

export default function EventComponent(props: Iprops) {
    const navigate = useNavigate();
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

    const eventBoxBorder = () => {
        if (props.event.myShift) return "event-conflict";
        return "event-box";
    };

    
  const renderModal = () => {
    return (
      <div>
        <Shift
          isOpen={eventInfoModal}
          id="0"
          returnUrl={""}
          refetch={eventBoxBorder}
          close={() => setEventInfoModal(false)}
        />
      </div>
    );
  };

    return (
        <div>
            {renderModal()}
            <div key={props.event.shiftId} className="row event-row">
                <div className="col">
                    <div className={eventBoxBorder() + " " + eventBoxColor()} onClick={() => setEventInfoModal(true)}>

                        <div title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                            <span className="font-weight-bold sm">{props.event.name}</span><br></br>
                            {props.event.name === "Bagvagt" || props.event.name === "Ansvarlig" ? "" : (
                                <div>
                                    <span className="font-weight-bold sm"><b>{moment(props.event.startTime).format("HH:mm")} - {moment(props.event.endTime).format("HH:mm")} </b></span>
                                    <ProgressAvailable total={props.event.slots!} occupied={props.event.members.length}></ProgressAvailable>
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