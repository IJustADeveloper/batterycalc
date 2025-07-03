import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function LineChart({chartData}){
    console.log(chartData)

    let datasets = []

    for (let [bid, data] of Object.entries(chartData)) {
        datasets.push({
            label: "bat_"+bid,
            data: data.tpdata,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
        })
    }

    const data = {
        datasets: datasets
    };

    const options = {
        elements: {
            point:{
                radius: 0
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'power'
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Time'
            },
          },
          y: {
            title: {
              display: true,
              text: 'Power'
            },
        
          }
        }
      };

    return <Line data={data} options={options} />;
};

export default LineChart;