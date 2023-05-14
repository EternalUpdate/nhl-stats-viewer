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
import { Text, Box } from "@chakra-ui/react";

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
    title?: string;
}

const SingleStatPlayerLineChart = ({
    playerID,
    statTypes,
    title,
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
                    maintainAspectRatio: false,
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

    const chartTitle =
        title || (statTypes.length === 1 ? statTypes[0] : "Multiple Stats");

    return (
        <Box
            p={{ base: "6", md: "16" }}
            px={{ base: "0" }}
            py={{ md: "6" }}
            m={{ md: "9" }}
            mt={{ md: "-1" }}
        >
            <Text
                fontSize={{ base: "md", md: "xl", lg: "2xl" }}
                mb={{ base: "3", md: "4", lg: "6" }}
            >
                {chartTitle}
            </Text>
            <Box w="100%" h={{ base: "250px", md: "400px", lg: "500px" }}>
                <Line options={options} data={data} />
            </Box>
        </Box>
    );
};

export default SingleStatPlayerLineChart;
