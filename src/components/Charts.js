import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Charts({ transactions }) {
  // Линейный график доходов и расходов
  const lineData = {
    labels: transactions.map(t => t.date),
    datasets: [
      {
        label: "Доход",
        data: transactions
          .filter(t => t.type === "income")
          .map(t => Number(t.amount)),
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46, 125, 50, 0.2)",
        tension: 0.3
      },
      {
        label: "Расход",
        data: transactions
          .filter(t => t.type === "expense")
          .map(t => Number(t.amount)),
        borderColor: "#c62828",
        backgroundColor: "rgba(198, 40, 40, 0.2)",
        tension: 0.3
      }
    ]
  };

  // Круговая диаграмма по суммам категорий расходов
  const categories = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });

  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#2e7d32",
          "#c62828",
          "#f9a825",
          "#1565c0",
          "#6a1b9a",
          "#ff5722"
        ]
      }
    ]
  };

  return (
    <div className="charts-container">
      <h3>Доходы и расходы</h3>
      <Line data={lineData} />
      {transactions.some(t => t.type === "expense") && (
        <>
          <h3>Расходы по категориям</h3>
          <Pie data={pieData} />
        </>
      )}
    </div>
  );
}

export default Charts;
