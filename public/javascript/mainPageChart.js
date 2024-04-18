const chartElement = document.getElementById("chart");

// Define labels and initial data for the chart
const labels = budget.expenses.map(expense => expense.expenseName);
labels.push("Surplus");

// TODO: Put in bottom or sperate folder. Update Chart Data function. 
const updateChartData = () => {
  const surplusPercentage = 1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);
  const surplus = surplusPercentage * 100;
  
  let dataPoints = budget.expenses.map(expense => expense.part * 100);
  dataPoints.push(surplus);

  return dataPoints.map(part => part); 
};

// Initial data points setup
let dataPoints = updateChartData();

// Chart configuration
const config = {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [{
      label: '%',
      data: dataPoints,
      borderWidth: 1,
    }]
  },
  options: {
    plugins: {
      datalabels: {
        formatter: (value) => ((value / 100) * budget.totalIncome).toFixed(2) + ' kr.',
        anchor: 'end',
        clamp: true,
        align: 'start',
        color: '#000',
      }
    },
    responsive: true,
  },
  plugins: [ChartDataLabels]
};

// Create the chart
const chart = new Chart(chartElement, config);

// Listen for changes in the budget data
document.addEventListener('change', () => {
  // Update data points
  const updatedDataPoints = updateChartData(); 

  // Update chart data
  chart.data.datasets[0].data = updatedDataPoints; 

  // Update the chart display
  chart.update(); 
});
