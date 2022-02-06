import apisauce from 'apisauce'
import config from '../config'

const alpacaApi = (baseURL = config.BASE_URL) => {

    const api = apisauce.create({
        baseURL: config.Stock_url,
        headers: {
            'APCA-API-KEY-ID': config.alpacas_api_key_id,
            'APCA-API-SECRET-KEY': config.alpacas_api_secret_key
        },
    })
    const getBars = (symbol,start,end,limit,timeframe,adjustment,feed) => api.get('/v2/symbol/'+symbol+'/bars/?start='+start+'&end='+end+'&limit='+limit+'&timeframe='+timeframe+'&adjustment='+adjustment+'&feed='+feed)
    const quote = (symbol) => api.get('/v2/stocks/'+symbol+'/quotes/latest')
    const mutiquotes = (symbols) => api.get('/v2/stocks/snapshots/'+symbols)
    return {
        getBars,
        quote,
        mutiquotes
    }
}

export default alpacaApi
