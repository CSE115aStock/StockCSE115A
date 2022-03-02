import apisauce from 'apisauce';
import config from '../config';

const alpacaApi = (baseURL = config.BASE_URL) => {
  const api = apisauce.create({
    baseURL: config.Stock_url,
    headers: {
      'APCA-API-KEY-ID': config.alpacas_api_key_id,
      'APCA-API-SECRET-KEY': config.alpacas_api_secret_key,
    },
  });
  const getBars = (symbol, start, timeframe) =>
    api.get('/v2/stocks/'+symbol+'/bars?start='+
    start+'&timeframe='+timeframe+'&limit=10000');
  const getMultiBars = (symbols, start, timeframe) =>
    api.get('/v2/stocks/bars?symbols='+symbols+'&start='+
    start+'&timeframe='+timeframe+'&limit=10000');
  const quote = (symbol) => api.get('/v2/stocks/'+
    symbol+'/quotes/latest');
  const trades = (symbol) => api.get('/v2/stocks/'+
    symbol+'/trades/latest');
  const mutiquotes = (symbols) => api.get('/v2/stocks/snapshots?symbols='+
    symbols);
  const news = (symbols) =>
    api.get('/v1beta1/news?limit=5&exclude_contentless=true&symbols='+
      symbols);
  return {
    getBars,
    getMultiBars,
    quote,
    trades,
    mutiquotes,
    news,
  };
};

export default alpacaApi;
