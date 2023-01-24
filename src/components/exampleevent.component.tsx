import { List, Progress } from "reactstrap";
// import './Calendar.css';


export default function ExampleEventComponent() {




    return (

        <div key={1} className="row event-row">
            <div className="col">
                <div className="event-box" >

                    <div title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                        <span className="font-weight-bold sm">Kitchen</span><br></br>
                            <div>
                                <span className="font-weight-bold sm"><b>8:15 - 12:00 </b></span>
                                <Progress
                                    className="shiftprogress"
                                    value={50}
                                    color="danger"
                                />
                                <div className="shiftprogresstext">
                                    1 of 5 shifts available
                                </div>
                            </div>
                        
                        <div className="event-list">
                            <List >
                                <li>
                                    Member.Name1
                                </li>
                                <li>
                                    Member.Name2
                                </li>
                                <li>
                                    Member.Name3
                                </li>
                                <li>
                                    Member.Name4
                                </li>
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}