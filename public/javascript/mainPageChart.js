const chartElement = document.getElementById("chart");

// Define labels and initial data for the chart
const labels = budget.expenses.map(expense => expense.expenseName);

// Add the Surplus label, to the list of labels
labels.push("Surplus");

// Initial data points setup
let dataPoints = updateChartData();

// Shades of blue for the chart
let blueShades = ["#03045e","#0077b6", "#00b4d8", "#90e0ef", "#caf0f8", "#f6d55c", "#ed553b", "#e71d36", "#b80d57", "#721b65","#440a67","#2d0835","#0a043c","#f0f0f0","#d3d3d3","#a9a9a9","#7a7a7a","#4d4d4d","#000000"]

// This is added to change the value of the field "Surplus" to green
blueShades[dataPoints.length-1] = "#f2ff22";

// Chart configuration
const config = {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [{
      label: '%',
      data: dataPoints,
      backgroundColor: blueShades,
      borderWidth: 1,
    }]
  },
  options: {
    plugins: {
      datalabels: {
        formatter: (value) => ((value / 100) * budget.totalIncome).toFixed(2) + ' DKK',
        anchor: 'end',
        clamp: true,
        align: 'start',
        color: '#000',
        backgroundColor: '#fff',
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

// Update Chart Data function. 
function updateChartData() {
  const surplusPercentage = 1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);
  const surplus = surplusPercentage * 100;
  
  let dataPoints = budget.expenses.map(expense => expense.part * 100);
  dataPoints.push(surplus);

  return dataPoints.map(part => part); 
};

// Download JSON file by clicking on the download icon or download text

// Get download button element
const downloadButton = document.getElementById('downloadButton');

// Get download text element
const downloadText = document.getElementById('download-text');

// event listener for the download button
downloadButton.addEventListener('click', handleDownloadButtonClick);

// event listener for the download text
downloadText.addEventListener('click', handleDownloadButtonClick);

// handling for the download button when it is clicked
function handleDownloadButtonClick() {
  
  // object into a JSON string 
  const chartConfigJSON = JSON.stringify(config);

  // Converting the JSON string into a data URI format
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(chartConfigJSON);

  // Linking element with href
  const downloadLink = document.createElement('a');
  downloadLink.href = dataUri;
  downloadLink.download = 'YourDownloadedBudget.json'; // file name for the downloaded the budget 

  downloadLink.click();
}

// Download icon
const downloadImage = document.querySelector('.download-image');

// EventListener for the download icon or text so when clicked it downloads
downloadImage.addEventListener('click', function() {
  // clicks the hidden download button. Refer to css to see it is hidden
  downloadButton.click();
});
