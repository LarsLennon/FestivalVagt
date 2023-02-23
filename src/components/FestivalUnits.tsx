import { Col, Container, Progress, Row } from "reactstrap";

interface Iprops {
    units: number;
    sectionName: string;
}

export default function FestivalUnits(props: Iprops) {


    const getProgressColor = () => {
        if (props == null) return "danger";
        if (props.units > 42) return "success";
        if (props.units > 41) return "warning";
        return "danger";
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h2 className="headertext">{props.sectionName} </h2>
                        <div className="text-center">
                            <b>{props.units}</b> af 42 Festival-timer
                        </div>
                        <Progress
                            color={getProgressColor()}
                            striped
                            max="42"
                            value={props.units}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}