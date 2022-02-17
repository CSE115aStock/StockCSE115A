import React from 'react';
import StockViewerContext from './StockViewerContext';

function StockViewer() {
    return (
        <StockViewerContext.Consumer>
          {({finalSearch}) => (
            <div>
                Ticker: {finalSearch}
            </div>
          )}
        </StockViewerContext.Consumer>
    )

}

export default StockViewer;import React, { useContext, useEffect, useState } from 'react';
import StockViewerContext from './StockViewerContext';
import Chart from './Charts/MACDchart';
import { getData } from './Charts/utils';
import { Box } from '@mui/material';
import { Grid, Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import alpacaApi from './StockPage/services/polygon';
import RenderContext from './RenderContext';


class ChartComponent extends React.Component {
	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
    
    
		return (
			<Chart type='hybrid' data={this.state.data} />
		)
	}
}

// class StockDataComponent extends React.Component {
// 	componentDidMount() {
//     const search = this.props.search
    
// 	}
// 	render() {
// 		if (this.state == null) {
// 			return <div>Loading...</div>
// 		}
    
//     console.log(this.state)
// 		return (
      
// 			<Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2} >
//         <Grid item xs={12}>
//             <Card >
//                 <CardContent>
//                 <Typography gutterBottom variant="h4" color="primary">
//                   {this.props.search}
//                 </Typography>
//                 <ChartComponent search={this.props.search} />
//                 </CardContent>
//             </Card>
//         </Grid>
//         <Grid item xs={12}>
//           <div>hello</div>
//         </Grid>
//         <Grid item xs={12}>
//           <div>hello</div>

//         </Grid>
//       </Grid>
//     </Box>
// 		)
// 	}
// }

function StockViewer() {
  const search = useContext(StockViewerContext).finalSearch;
  const api = alpacaApi();
  const [stockData, setStockData] = useState([])
  useEffect(() =>{
    api.mutiquotes(search).then(data => {
      setStockData(data['data']);
      console.log(data);
    })
  })
		
  return (
    
    <div>{search}</div>
   
  )

}

export default StockViewer;