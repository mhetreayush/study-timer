import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const StudyTimeChart = ({ chartData }) => {
  const dataset = chartData;
  // const [dataset, setDataset] = useState([]);
  // setDataset((prevData) => (prevData = chartData));
  // setInterval(() => setDataset(chartData), 3000);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const day = today.toDateString().split(" ")[0];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Weekly Study Analysis",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 24,
        ticks: { stepSize: 1 },
      },
      x: {},
    },
  };

  const labels = dataset.slice(-7).map((x) => x.day);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "No. of hours",
        data: dataset.slice(-7).map((x) => x.noOfHoursStudied),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line
        className="md:rotate-0 -rotate-90 px-8"
        options={options}
        data={data}
      />
    </>
  );
};

export default StudyTimeChart;
