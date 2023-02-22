import moment from "moment";
import { useNavigate } from "react-router-dom";
import { List, Progress } from "reactstrap";
import { ShiftWithMemberDTO } from "../interface/interface";

interface Iprops {
    event: ShiftWithMemberDTO;
    returnUrl: string;
}

export default function EventComponent(props: Iprops) {
    const navigate = useNavigate();


    const mapMembers = props.event.members.map((Member, index) => {
        return (
            <li key={index}>
                {Member.name}
            </li>
        );
    });

    return (

        <div key={props.event.shiftId} className="row event-row">
            <div className="col">
                <div className="event-box" onClick={() => navigate(props.returnUrl + "/shift/" + props.event.shiftId)}>

                    <div title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                        <span className="font-weight-bold sm">{props.event.name} {props.event.name === "Bagvagt" || props.event.name === "Ansvarlig" ? "" : ""}</span><br></br>
                        {props.event.name === "Bagvagt" || props.event.name === "Ansvarlig" ? "" : (
                            <div>
                                <div>
                                    <span className="font-weight-bold sm"><b>{moment(props.event.startTime).format("HH:mm")} - {moment(props.event.endTime).format("HH:mm")} </b></span>
                                </div>
                                <div className="event-list">
                                    <List >
                                        {mapMembers}
                                    </List>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}