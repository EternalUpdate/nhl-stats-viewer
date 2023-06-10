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
    getAllSeasonLabels,
    getAllSeasonsPlayerStats,
    getSingleStatOverTheSeasons,
} from "../utils/nhl-api-helpers";
import { Text, Box } from "@chakra-ui/react";
import { minuteSecondStringToNum } from "../utils/time-helpers";
import { numToMinuteSecond } from "../utils/time-helpers";
import { PlayerSeasonStats } from "../types/PlayerSeasonStats";

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
    playoffs?: boolean;
    allSeasonsStats?: PlayerSeasonStats[]; // either regular season or playoffs
}

/**
 * A line chart that displays a player's stats over the seasons.
 * If it's not given the player's stats over the seasons, it will fetch them from the NHL API.
 *
 * @prop {number} playerID - The ID of the player in the NHL API.
 * @prop {string[]} statTypes - The type(s) of stats to display.
 * @prop {string} title - The title of the chart.
 * @prop {boolean} playoffs - Whether to fetch playoff stats or not (if the stats aren't given directly via allSeasonsStats).
 * @prop {PlayerSeasonStats[]} allSeasonsStats - The player's stats over the seasons (either regular season or playoffs).
 *
 * @returns {JSX.Element} A line chart that displays a player's stats over the seasons.
 */
const PlayerStatLineChart = ({
    playerID,
    statTypes,
    title,
    playoffs,
    allSeasonsStats,
}: PlayerStatLineChartProps) => {
    const [options, setOptions] = useState<object>({});
    const [data, setData] = useState<any>({
        labels: [],
        datasets: [],
    });
    const [stats, setStats] = useState<PlayerSeasonStats[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (allSeasonsStats) {
                    setStats(allSeasonsStats);
                }

                if (playoffs) {
                    if (!allSeasonsStats) {
                        const newStats = await getAllSeasonsPlayerStats(
                            playerID,
                            true
                        );
                        setStats(newStats);
                    }
                } else {
                    if (!allSeasonsStats) {
                        const newStats = await getAllSeasonsPlayerStats(
                            playerID
                        );
                        setStats(newStats);
                    }
                }

                const chartLabels = await getAllSeasonLabels(stats);

                // Prepare datasets for each stat type
                const datasets = await Promise.all(
                    statTypes.map(async (statType, index) => {
                        let chartData = await getSingleStatOverTheSeasons(
                            statType,
                            stats
                        );

                        if (statType.toLowerCase().includes("time")) {
                            chartData = chartData.map((time) => {
                                if (typeof time === "string") {
                                    return minuteSecondStringToNum(time);
                                }
                                return time;
                            });
                        }

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
                    })
                );

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
                        tooltip: {
                            callbacks: {
                                label: (context: any) => {
                                    let label = context.dataset.label || "";
                                    if (label) {
                                        label += ": "; // e.g., "evenTimeOnIce: "
                                    }
                                    if (
                                        statTypes[0]
                                            .toLowerCase()
                                            .includes("time")
                                    ) {
                                        label += numToMinuteSecond(
                                            context.parsed.y
                                        ); // adds the formatted time ("evenTimeOnIce: 964:48")
                                    } else {
                                        label += context.parsed.y;
                                    }

                                    return label;
                                },
                            },
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: (seconds: number) => {
                                    if (
                                        statTypes[0]
                                            .toLowerCase()
                                            .includes("time")
                                    ) {
                                        return numToMinuteSecond(seconds);
                                    }
                                    return seconds;
                                },
                            },
                            beginAtZero: true,
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
    }, [playerID, statTypes, playoffs, allSeasonsStats, stats]);

    const chartTitle =
        title || (statTypes.length === 1 ? statTypes[0] : "Multiple Stats");

    let maxWidth = "0px";
    let maxHeight = "0px";

    // bigger charts when there are more stats
    if (statTypes.length > 2) {
        maxWidth = "500px";
        maxHeight = "300px";
    } else {
        maxWidth = "400px";
        maxHeight = "250px";
    }

    // Check if data has been fetched
    if (data.labels.length === 0 || data.datasets.length === 0) {
        return null; // or display a loading state, error message, etc.
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mb={{ base: "14", md: "-4" }}
        >
            <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                mb={{ base: "3", md: "4", lg: "6" }}
            >
                {chartTitle}
            </Text>
            <Box
                w={{ base: "320px", md: maxWidth }}
                h={{ base: "250px", md: maxHeight }}
            >
                <Line options={options} data={data} />
            </Box>
        </Box>
    );
};

export default PlayerStatLineChart;
