import { useEffect, useState } from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
    getLabelsFromNHLYears,
    getSingleStatOverTheYears,
} from "../utils/nhl-api-helpers";

// Register the necessary scales and elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface PlayerStatLineChartProps {
    playerID: number;
    statTypes: string[];
}

const SingleStatPlayerLineChart = ({
    playerID,
    statTypes,
}: PlayerStatLineChartProps) => {
    const [options, setOptions] = useState<object>({});
    const [data, setData] = useState<any>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=yearByYear`
                );
                const result = await response.json();

                // Extract the necessary data from the API response
                const jsonString = JSON.stringify(result);
                const chartLabels = getLabelsFromNHLYears(
                    undefined,
                    jsonString
                );

                // Prepare datasets for each stat type
                const datasets = statTypes.map((statType, index) => {
                    const chartData = getSingleStatOverTheYears(
                        jsonString,
                        statType
                    );

                    // Define an array of colors
                    const colors = [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        // Add more colors as needed
                    ];

                    // Define an array of data point icons
                    const pointStyles = [
                        "circle",
                        "triangle",
                        "rect",
                        // Add more point styles as needed
                    ];

                    return {
                        label: statType,
                        data: chartData,
                        borderColor: colors[index % colors.length],
                        backgroundColor: colors[index % colors.length],
                        pointStyle: pointStyles[index % pointStyles.length],
                    };
                });

                // Chart.js variables
                setOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top" as const,
                            display: statTypes.length > 1,
                        },
                        title: {
                            display: false,
                        },
                    },
                });
                setData({
                    labels: chartLabels,
                    datasets: datasets,
                });
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [playerID, statTypes]);

    return (
        <div className="single-chart-container">
            <div className="chart-wrapper">
                <div className="chart-title">
                    {statTypes.length === 1 ? statTypes[0] : "Multiple Stats"}
                </div>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default SingleStatPlayerLineChart;
