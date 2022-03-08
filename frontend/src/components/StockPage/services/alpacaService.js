import apisauce from 'apisauce';
import config from '../config';

const alpacaApi = (baseURL = config.BASE_URL) => {
  const api = apisauce.create({
    baseURL: config.BASE_URL,
    headers: {
      'APCA-API-KEY-ID': config.alpacas_api_key_id,
      'APCA-API-SECRET-KEY': config.alpacas_api_secret_key,
    },
  });
  const getAccount = () => api.get('v2/account');
  const getPositions = () => api.get('v2/positions');

  return {
    getAccount,
    getPositions,
  };
};

export default alpacaApi;
