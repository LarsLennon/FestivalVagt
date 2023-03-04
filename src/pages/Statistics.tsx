import { useEffect, useState } from "react";
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
        <div>
            <h5>Statistics</h5>
            {apiData?.totalUnits}
        </div>
    );
}