const chart = document.getElementById('chart');

const selectedBudget = JSON.parse(budget)
const labels = selectedBudget.expenses.map(expense => expense.expenseName)
labels.push('Surplus')

const totalIncome = selectedBudget.totalIncome

const surplusPercentage = 1 - selectedBudget.expenses.reduce((prev, next) => prev+ next.part, 0)
const surplus = totalIncome * surplusPercentage

const dataPoints = selectedBudget.expenses.map(expense => expense.part*totalIncome)
dataPoints.push(surplus)


new Chart(chart, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'kr.',
        data: dataPoints,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });