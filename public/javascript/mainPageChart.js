const chart = document.getElementById('chart');

const selectedBudget = JSON.parse(budget)
const labels = selectedBudget.expenses.map(expense => expense.expenseName)
labels.push('Surplus')

const totalIncome = selectedBudget.totalIncome

const surplusPercentage = 1 - selectedBudget.expenses.reduce((prev, next) => prev+ next.part, 0)
const surplus = surplusPercentage * 100

const dataPoints = selectedBudget.expenses.map(expense => expense.part*100)
dataPoints.push(surplus)

const config ={
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: '%',
        data: dataPoints.map(part => Math.round(part)),
        borderWidth: 1
      }]
    },
    options: {
        plugins: {
            datalabels: {
                formatter: (value) => value/100*totalIncome + ' kr.',
                anchor: 'end',
                clamp: true,
                align: 'start',
                color: '#000',
            }
        }
    },
    plugins: [ChartDataLabels]
} 


new Chart(chart, config);
