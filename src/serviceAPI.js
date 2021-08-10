const valueURL = 'https://blockchain.info/ticker';
const convertURL = 'https://blockchain.info/tobtc?currency=USD&value=50';

export const getBitcoinValueAPI = async () => {
  console.log('API CALL');

  return fetch(valueURL)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`getBitcoinValueAPI ERROR - ${err.message}`);
    });
};

export const getBitcoinConversionAPI = async (currency, value) => {
  return fetch(`${convertURL}currency=${currency}&value=${value}`)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`getBitcoinConversionAPI ERROR - ${err.message}`);
    });
};
