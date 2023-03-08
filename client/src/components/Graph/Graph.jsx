import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);
export function Graph({ graphData }) {
    function getGradient(ctx, chartArea) {
        let width, height, gradient;
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
        );
        gradient.addColorStop(0.94, "#26A53A");
        gradient.addColorStop(0.9536,"#D4EB47");
        gradient.addColorStop(0.963, "#E1E431");
        gradient.addColorStop(1, "#128317");
        gradient.addColorStop(0.36, "#E1E431");
        gradient.addColorStop(1, "#EE2121");
        return gradient    
    }

    return gradient;
  }  
  const options = {
      responsive:true,
      plugins: {
          tooltip: {
              callbacks: {
              title: function (tooltipItem) {
                  const from = (graphData[tooltipItem[0].dataIndex].from === "" ? "Data not available" : graphData[tooltipItem[0].dataIndex].from);
                  const to =
                    (graphData[tooltipItem[0].dataIndex].to === ""
                      ? "Data not available"
                      : graphData[tooltipItem[0].dataIndex].to);
                  const units = (graphData[tooltipItem[0].dataIndex].units === "0"
                      ? "Data not available"
                      : graphData[tooltipItem[0].dataIndex].units);
                    return `From: ${from}\nTo: ${to}\nUnits: ${units}`;
                  }
              }
          }
      }
  }
  const data = {
    labels: ["January","Feburary","March","April","May","June","July","August","September","October","November","December"],
    datasets: [
      {
        label: "Co2e of Energy Consumption",
        data: graphData.map((data)=>data.co2e),
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };
  return <Line data={data} options={options} />;
}
