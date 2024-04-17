const chart = document.getElementById("chart");

const labels = budget.expenses.map((expense) => expense.expenseName);
labels.push("Surplus");

const totalIncome = budget.totalIncome;

const surplusPercentage =
  1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);
const surplus = surplusPercentage * 100;

let dataPoints = budget.expenses.map((expense) => expense.part * 100);
dataPoints.push(surplus);

document.addEventListener("change", () => {
    dataPoints = budget.expenses.map((expense) => expense.part * 100);
    dataPoints.push(surplus);
    console.log(dataPoints);
});

const config = {
  type: "pie",
  data: {
    labels: labels,
    datasets: [
      {
        label: "%",
        data: dataPoints.map((part) => Math.round(part)),
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      datalabels: {
        formatter: (value) => (value / 100) * totalIncome + " kr.",
        anchor: "end",
        clamp: true,
        align: "start",
        color: "#000",
      },
    },
    responsive: true,
  },
  plugins: [ChartDataLabels],
};

new Chart(chart, config);
