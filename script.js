const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStrongeTransactions=JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStrongeTransactions : []

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('please add a text and amount')
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    }

    transactions.push(transaction)

    addTransctionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';

    amount.value = '';
  }
}

function generateId() {
  return Math.floor(Math.random() * 1000000000)
}


function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions))
}


function addTransctionDOM(transaction) {

  const sign = transaction.amount < 0 ? '-' : '+';


  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : "plus")


  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class='delete-btn' onclick="removeTranscaption(${transaction.id})">x</button>

  `;

  list.appendChild(item)


}


function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)


  const expens = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expens}`;
}


function removeTranscaption(id) {

  transactions= transactions.filter(transaction=> transaction.id !== id);

  updateLocalStorage();

init()
}



function init() {
  list.innerHTML = '';

  transactions.forEach(addTransctionDOM);

  updateValues();
}

init()

form.addEventListener('submit', addTransaction)