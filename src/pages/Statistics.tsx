import { useEffect, useState } from "react";
import { Col, Container, Progress, Row } from "reactstrap";
import { useGlobalContext } from "../hooks/GlobalContent";
import { StatisticsDTO } from "../interface/interface";
import apiService from "../services/api.service";

export default function Statistics() {
    const { sectionId } = useGlobalContext();


    const [isLoading, setLoading] = useState(true);
    const [apiData, setApiData] = useState<StatisticsDTO>();
    const loadApiData = () => {
        apiService.getStatistics(parseInt(sectionId)).then(
            (response) => {
                setLoading(false);
                setApiData(response.data);
                console.log(response.data);
            })
    };

    useEffect(() => {
        if (isLoading) {
            loadApiData();
        }
    });

    return (
        <Container>
            <h5>Statistics</h5>
            <p>{apiData?.totalUnits}</p>
            <p>{apiData?.totalMembers}</p>
            <p>{apiData?.verifiedMembers}</p>

            <Row>
                <Col className="col-4">

                    Medhjælpere der har bekræftet {apiData?.verifiedMembers} / {apiData?.totalMembers}
                    <Progress
                        max={apiData?.totalMembers}
                        value={apiData?.verifiedMembers}
                    />
                </Col>
                <Col className="col-4">

                Antal medhjælpere for at dække vagtplanen {apiData?.totalMembers} / {(apiData?.totalUnits!/42).toFixed(0)}
                    <Progress
                        max={apiData?.totalUnits!/42}
                        value={apiData?.totalMembers}
                    />
                </Col>
            </Row>
        </Container>
    );
}