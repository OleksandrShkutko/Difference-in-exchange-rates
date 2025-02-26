export default function getExchangeRates(date, doOnSuccess = () => {}, doOnError = () => {}) {
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/usd/${date}`)
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => doOnSuccess(data))
    .catch(error => {
      doOnError(error);
      console.error('Fetch error:', error.message);
    });
}