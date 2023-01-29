import moment from "moment";
import { useNavigate } from "react-router-dom";
import { List, Progress } from "reactstrap";
import { ShiftDTO } from "../interface/interface";

interface Iprops {
    event: ShiftDTO;
    returnUrl: string;
}

export default function EventComponent(props: Iprops) {
    const navigate = useNavigate();


    const mapMembers = props.event.Members.map((Member, index) => {
        return (
            <li key={index}>
                {Member.Name}
            </li>
        );
    });

    return (

        <div key={props.event.ShiftId} className="row event-row">
            <div className="col">
                <div className="event-box" onClick={() => navigate(props.returnUrl + "/shift/" + props.event.ShiftId)}>

                    <div title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                        <span className="font-weight-bold sm">{props.event.Name}</span><br></br>
                        {props.event.Name === "Bagvagt" || props.event.Name === "Ansvarlig" ? "" : (
                            <div>
                                <span className="font-weight-bold sm"><b>{moment(props.event.StartTime).format("HH:mm")} - {moment(props.event.EndTime).format("HH:mm")} </b></span>
                                <Progress
                                    className="shiftprogress"
                                    value={50}
                                    color="danger"
                                />
                                <div className="shiftprogresstext">
                                    1 of 5 shifts available
                                </div>
                            </div>
                        )}
                        <div className="event-list">
                            <List >
                                {mapMembers}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}