/**
 * @param {Object} response
 * @return {Object} JSX
 */
export function parseMultiResponse(response) {
  const bars = response.bars;


  let longestData = 0;
  for (const stock in bars) {
    if (bars[stock].length > longestData) {
      longestData = bars[stock].length;
    }
  }

  const data = new Array(longestData);

  for (const stocks in bars) {
    if (bars.hasOwnProperty(stocks)) {
      let lengthData = data.length - 1;
      for (let i = bars[stocks].length-1; i >= 0; i--) {
        const dataPoint = data[lengthData];
        const bar = bars[stocks][i];
        if (dataPoint == undefined) {
          const point = {
            'date': new Date(bar.t),
            'open': bar.o,
            'low': bar.l,
            'high': bar.h,
            'close': bar.c,
            'volume': bar.v,
          };
          data[lengthData] = point;
        } else {
          const point = {
            'date': new Date(bar.t),
            'open': bar.o + dataPoint.open,
            'low': bar.l + dataPoint.low,
            'high': bar.h + dataPoint.high,
            'close': bar.c + dataPoint.close,
            'volume': bar.v + dataPoint.volume,
          };
          data[lengthData] = point;
        }
        lengthData--;
      }
    }
  }

  return data;
}

/**
 * @param {Object} response
 * @return {Object} JSX
 */
export function parseResponse(response) {
  const {bars} = response.data;
  const data = [];
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    const point = {
      'date': new Date(bar.t),
      'open': bar.o,
      'low': bar.l,
      'high': bar.h,
      'close': bar.c,
      'volume': bar.v,
    };
    data.push(point);
  }
  return data;
}

