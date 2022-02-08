import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Chart from './Charts/AreaChart';
import { getData } from "./Charts/utils";
import { useState, useEffect } from 'react';
import alpacaApi from './StockPage/services/polygon';



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



export default function Dashboard() {
  const [token,setToken] = useState([])

  // //To log in as test user
  // useEffect(() => {
  //     fetch('/auth/login', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         "username":"john.doe","password":"John@12345"
  //       })
  //     } ).then(
  //       res => res.json()
  //       ).then(
  //         token => {
  //           setToken(token);
  //           console.log(token)
  //         }
  //       )
  
  //   }, [])
  const [port,setPort] = useState([])
  useEffect(() => {
  fetch('/portfolio/my_portfolio', {
  method: 'POST',
  headers: new Headers({
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NDM2MjQwNSwianRpIjoiZGJkZDg4OTEtMjU3ZC00NWI1LWJlODYtMWZjN2U5NzYzOTE4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImpvaG5AbWFpbC5jb20iLCJuYmYiOjE2NDQzNjI0MDUsImV4cCI6MTY0NDM2NjAwNX0.oABMGjNFKTyx7QfS1NHCgHL9RVxVIgItwrpNn45QYmE'
  }),
  body: JSON.stringify({
      
  })
  } ).then(
  res => res.json()
  ).then(
      port => {
          setPort(port)
          console.log(port);
      }
  )
  }, [])
  
  const [data,setData] = useState([])
  const a = alpacaApi();
  useEffect(() =>{
    a.mutiquotes('AMZN,GOOGL').then(data => {
        setData(data['data']);
        console.log(data);
    }
    );
  }, []);

  function createData(stock, amount, shares, price, high, low) {

    return {stock, amount, shares, price, high, low};
  }

  const portfolioDict = port[0];
  const portfolio = [];
  for(var key in portfolioDict, data){
    portfolio.push(createData(key, portfolioDict[key]['amount'], portfolioDict[key]['shares'], data[key]['latestTrade']['p'], data[key]['dailyBar']['h'], data[key]['dailyBar']['l']));
  }
  // // const clone = port[0];
  // // var stocks = '';
  // // for(var stock in clone){
  // //   if(stocks == ''){
  // //     stocks = stocks + stock;
  // //   }
  // //   else{
  // //     stocks = stocks + ',' + stock;
  // //   }
  // // }
  
  // // capitalInvested += portfolioDict[key]['amount'] * portfolioDict[key]['shares'];

  

  var worth = 0.0;
  var capitalInvested = 0.0;
  var performance = 0.0;

  
  
  
  // // for(var key in data){
  // //   for(var i in portfolio){
  // //     if(portfolio[i] == key);  
  // //       var price = data[key]['latestTrade']['p'];
  // //       var prevDayClosing = data[key]['prevDailyBar']['c'];
  // //       worth += price * key['amount'];
  // //       portfolio[i]['price'] = price;
  // //       portfolio[i]['high'] = data[key]['dailyBar']['h'];
  // //       portfolio[i]['low'] = data[key]['dailyBar']['l'];
  // //       portfolio[i]['change'] = ((price - prevDayClosing) / prevDayClosing) * 100;
  // //       portfolio[i]['profit'] = ((price - prevDayClosing) / prevDayClosing) * 100;
  // //     }
  // // }  
    
  // // , stockData[key]['latestTrade']['p'], stockData[key]['dailyBar']['h'], stockData[key]['dailyBar']['l'], stockData[key]['prevDailyBar']['c'])
  // worth = worth.toFixed(2);
  // performance = (worth - capitalInvested) / capitalInvested;
  // performance = performance.toFixed(2);
  const percentage = 2.5;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const darkTheme = createTheme({
      palette: {
        type: 'light',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
      },
      typography: {
        fontFamily: 'Montserrat',
      },
    });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: darkTheme.palette.primary.main,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
      },
    }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
          border: 0,
      },
  }));

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={8}>
            <Card >
                <CardContent>
                <Typography gutterBottom variant="h6" component="div" color="primary">
                  Your Portfolio
                </Typography>
                <ChartComponent />
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Portfolio Value
                    </Typography>
                    <Typography variant="h4" color="txtPrimary">
                        ${worth}
                    </Typography>
                    </CardContent>
            </Card>
            <br></br>
            <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Portfolio Performance
                    </Typography>
                    <Typography variant="h5" color="textPrimary" display="inline">
                        +{performance}%
                    </Typography>
                    </CardContent>
            </Card>
            <br></br>
            <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Highest Performing stock
                    </Typography>
                    <Typography variant="h5" color="textPrimary" display="inline">
                        APPL
                    </Typography>
                    <Typography color="textSecondary" display="inline">
                        &ensp;+{percentage}%
                    </Typography>
                    </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                      <Toolbar>
                        <Typography variant="h5" color="textPrimary" margin="10px">
                          Stocks
                        </Typography>
                        <Tooltip title="Add stock">
                          <IconButton color="primary" >
                            <AddRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </Toolbar>
                      <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Number of Stocks</StyledTableCell>
                          <StyledTableCell>Amount Invested</StyledTableCell>
                          <StyledTableCell>Stock Value</StyledTableCell>
                          <StyledTableCell>High</StyledTableCell>
                          <StyledTableCell>Low</StyledTableCell>
                          <StyledTableCell>Change Today</StyledTableCell>
                          <StyledTableCell>Profit</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolio.map((portfolio) => (
                          <StyledTableRow>
                          <StyledTableCell>
                              {portfolio.stock}
                          </StyledTableCell>
                          <StyledTableCell>{portfolio.shares}</StyledTableCell>
                          <StyledTableCell>${portfolio.amount}</StyledTableCell>
                          <StyledTableCell>${portfolio.price}</StyledTableCell>
                          <StyledTableCell>${portfolio.high}</StyledTableCell>
                          <StyledTableCell>${portfolio.low}</StyledTableCell>
                          {/* <StyledTableCell>{(portfolio.change).toFixed(2)}%</StyledTableCell>
                          <StyledTableCell>{portfolio.profit}%</StyledTableCell> */}
                          </StyledTableRow>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
