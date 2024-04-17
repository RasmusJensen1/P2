console.log("mainPage");

const root = document.getElementById('slider-container') //or target div
const expense = document.createElement('div');
const circle = document.createElement('div');
const input = document.createElement('input');

circle.textContent = "house";
expense.appendChild(circle);
input.setAttribute('type', 'range');

expense.appendChild(input)
expense.setAttribute('class','expense');

root.appendChild(expense);