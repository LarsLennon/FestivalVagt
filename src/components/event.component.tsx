import { Badge } from "reactstrap";
import { IFooBar } from "./calendar2.component";

interface Iprops {
    event: IFooBar;

}

export default function EventComponent(props:Iprops) {

return(
    
    <div key={props.event.ShiftId} className="row event-row">
    <div className="col">
        <div className="event-box">
            <a title="Du kan ikke vælge denne vagt" className="event-link active" asp-page="/Shifts/Overview" asp-route-id="@item.ShiftId">
                <span className="font-weight-bold sm">{props.event.Name}</span>
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
)

}