import { ResponseTypes } from '../../constants';

const getExchangeRates = async(date) => {
  try {
    const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/usd/${date}`);
    if (!response.ok) {
      return { type: ResponseTypes.Error, content: `HTTP error! Status: ${response.status}`};
    }
    return { type: ResponseTypes.Success, content: await response.json() }
  } catch (error) {
    console.error('Fetch error:', error.message);
    return { type: 'error', content: error};
  }
}

export default getExchangeRates;