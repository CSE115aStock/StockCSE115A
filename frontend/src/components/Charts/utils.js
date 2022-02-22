

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
    console.log(promiseMSFT)
	return promiseMSFT;
}

export function parseResponse (response){
  const { bars } = response.data;
  const data = []
  for(let i = 0; i < bars.length; i++) {
      const bar = bars[i];
      const point = {
          'date': new Date(bar.t),
          'open': bar.o,
          'low': bar.l,
          'high': bar.h,
          'close': bar.c,
          'volume': bar.v
      }
      data.push(point)
  }
  return data
}
