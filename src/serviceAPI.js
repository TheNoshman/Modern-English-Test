const valueURL = 'https://blockchain.info/ticker';

export const getBitcoinValueAPI = async () => {
  console.log('in api');

  return fetch(valueURL)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`getBitcoinValueAPI ERROR - ${err.message}`);
    });
};

const convertURL = 'https://blockchain.info/tobtc?';
export const getBitcoinConversionAPI = async (currency, value) => {
  return fetch(`${convertURL}currency=${currency}&value=${value}`)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`getBitcoinConversionAPI ERROR - ${err.message}`);
    });
};
