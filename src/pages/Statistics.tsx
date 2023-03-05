import { useEffect, useState } from "react";
import { Col, Container, Progress, Row } from "reactstrap";
import { useGlobalContext } from "../hooks/GlobalContent";
import { StatisticsDTO } from "../interface/interface";
import apiService from "../services/api.service";

export default function Statistics() {
    const { sectionId } = useGlobalContext();


    // const [isLoading, setLoading] = useState(true);
    const [apiData, setApiData] = useState<StatisticsDTO>();
    const loadApiData = () => {
        apiService.getStatistics(parseInt(sectionId)).then(
            (response) => {
                // setLoading(false);
                setApiData(response.data);
                console.log(response.data);
            })
    };



    useEffect(() => {
        const interval = setInterval(() => {
            loadApiData();
        }, 5000);
    
        return () => clearInterval(interval);
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <h5>Statistics</h5>

            <Row>
                <Col className="col-4">


                    Medhjælpere med 42 timer {apiData?.membersWith42Hours} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.membersWith42Hours}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere mellem 41 og 42 timer {apiData?.membersWith41Hours} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.membersWith41Hours}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere med nogle vagter {apiData?.membersWithSomeHours} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.membersWithSomeHours}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere uden vagter {apiData?.membersWith0Hours} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.membersWith0Hours}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere der har bekræftet {apiData?.verifiedMembers} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.verifiedMembers}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere for at dække vagtplanen {apiData?.totalMembers} / {(apiData?.totalUnits! / 42).toFixed(0)}
                    <Progress
                        value={apiData?.totalMembers}
                        max={apiData?.totalUnits! / 42}
                    />
                    <br></br>
                    Medhjælpere med kørekort {apiData?.drivers} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.drivers}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere med  erfaring {apiData?.experienced} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.experienced}
                        max={apiData?.totalMembers}
                    />
                    <br></br>

                    Medhjælpere med førstehjælp {apiData?.firstAid} / {apiData?.totalMembers}
                    <Progress
                        value={apiData?.firstAid}
                        max={apiData?.totalMembers}
                    />
                </Col>
                <Col className="col-4">

                    Antal timer taget {apiData?.unitsRemaining.toFixed(0)} / {apiData?.totalUnits.toFixed(0)}
                    <Progress
                        value={apiData?.unitsRemaining}
                        max={apiData?.totalUnits}
                    />
                    <br></br>

                    Antal fyldte vagter {apiData?.fullShifts.toFixed(0)} / {apiData?.totalShifts.toFixed(0)}
                    <Progress
                        value={apiData?.fullShifts}
                        max={apiData?.totalShifts}
                    />
                    <br></br>

                    Antal tomme vagter {apiData?.emptyShifts.toFixed(0)} / {apiData?.totalShifts.toFixed(0)}
                    <Progress
                        value={apiData?.emptyShifts}
                        max={apiData?.totalShifts}
                    />
                    <br></br>

                </Col>
            </Row>
        </Container>
    );
}