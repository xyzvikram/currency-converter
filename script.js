const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert');

const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(cur => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = cur;
      option1.text = option2.text = cur;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

convertBtn.addEventListener('click', async () => {
  const base = fromCurrency.value;
  const target = toCurrency.value;
  const amt = amount.value;

  if (amt === '' || amt <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
  const data = await res.json();
  const rate = data.rates[target];
  const converted = (amt * rate).toFixed(2);
  result.textContent = `${amt} ${base} = ${converted} ${target}`;
});