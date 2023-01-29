import { Progress } from "reactstrap";

export default function ProgressAvailable(props:
    { total: number, occupied: number }) {


    const percentage = (props.occupied * 100) / props.total;

    const colorClass = percentage >= 50 ? (percentage > 75 ? "danger" : "warning") : "success";



    return (
        <div>
            <Progress
                className="shiftprogress"
                value={(props.occupied * 100) / props.total}
                color={colorClass}
            />
            <div className="shiftprogresstext">
                {props.total - props.occupied} pladser ledige
            </div>
        </div>
    )

}