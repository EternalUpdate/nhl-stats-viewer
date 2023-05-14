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
    IndividualStatsTypes,
    getGroupedStatsOverTheYears,
    getLabelsFromNHLYears,
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

interface singleStatPlayerLineChartProps {
    playerID: number;
    statType: string;
}

const SingleStatPlayerLineChart = (singleStatPlayerLineChartProps) => {
    const [options, setOptions] = useState<object>({});
    const [data, setData] = useState<any>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://statsapi.web.nhl.com/api/v1/people/${singleStatPlayerLineChartProps.playerID}/stats?stats=yearByYear`
                );
                const result = await response.json();

                // Extract the necessary data from the API response
                const jsonString = JSON.stringify(result);
                const chartLabels = getLabelsFromNHLYears(
                    undefined,
                    jsonString
                );
                const chartData =
                    getGroupedStatsOverTheYears(jsonString)[
                        IndividualStatsTypes.goals
                    ];

                // Chart.js variables
                setOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            // position: "top" as const,
                            display: false,
                        },
                        title: {
                            display: true,
                            text: "Goals",
                        },
                    },
                });
                setData({
                    labels: chartLabels,
                    datasets: [
                        {
                            label: "Goals",
                            data: chartData,
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                });
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="single-chart-container">
            <Line options={options} data={data} />
        </div>
    );
};

export default SingleStatPlayerLineChart;
