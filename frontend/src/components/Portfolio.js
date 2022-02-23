import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Chart from './Charts/MACDchart';
import { getData } from "./Charts/utils";
import { useState, useEffect } from 'react';
import alpacaApi from './StockPage/services/polygon';
import RenderContext from './RenderContext';

import AddIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/RemoveRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

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
  const [port,setPort] = useState([])
  const [data,setData] = useState([])

  useEffect(() => {
    fetchPort();
    fetchData();
  }, []);

  const fetchPort = () => {
    fetch('/portfolio/my_portfolio', {
    method: 'POST',
    headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('JWT')
    }),
    body: JSON.stringify({
        
    })
    } ).then(
    res => res.json()
    ).then(
        port => {
            setPort(port)
        }
    )
  }
  
  const fetchData = () => {
    fetch('/portfolio/my_portfolio', {
    method: 'POST',
    headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('JWT')
    }),
    body: JSON.stringify({
        
    })
    } ).then(
    res => res.json()
    ).then(
        port => {
          var stocks = '';
          for(var stock in port[0]){
            if(stocks == ''){
              stocks = stocks + stock;
            }
            else{
              stocks = stocks + ',' + stock;
            }
          }
          const api = alpacaApi();
          api.mutiquotes(stocks).then(data => {
            setData(data['data']);
          }); 
        }
    )
  } 

  function createData(stock, amount, shares, price, high, low, closing) {
    var change = (((price - closing) / closing) * 100);
    var profit = ((price - (amount / shares)) / (amount / shares)*100).toFixed(2);
    return {stock, amount, shares, price, high, low, change, profit};
  }

  var performance = 0.0;
  var worth = 0.0;
  var capitalInvested = 0;
  var highestPerforming = [0,0];
  const portfolioDict = port[0];
  const portfolio = [];

  if(portfolioDict != null && Object.keys(portfolioDict).length != 0)  {
    for(var key in portfolioDict, data){
      portfolio.push(createData(key, portfolioDict[key]['amount'], portfolioDict[key]['shares'], 
                                      data[key]['latestTrade']['p'], data[key]['dailyBar']['h'], 
                                      data[key]['dailyBar']['l'], data[key]['prevDailyBar']['c']
                                      ));
      capitalInvested += parseInt(portfolioDict[key]['amount']);
      worth += data[key]['latestTrade']['p'] * portfolioDict[key]['shares'];
      if(highestPerforming[0]==0){
        highestPerforming = [key, portfolio[portfolio.length-1].change] 
      }
      else{
        if(highestPerforming[1] < portfolio[portfolio.length-1].change){
          highestPerforming = [key, portfolio[portfolio.length-1].change];
        }
      }
    }
  }
  worth = worth.toFixed(2);
  performance = (((worth - capitalInvested)/capitalInvested) * 100).toFixed(2);

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

  const [tickr, setTickr] = useState('');
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
 
  // hook for edit stock options
  const [addStock, setAddStock] = useState(false);
  const [removeStock, setRemoveStock] = useState(false);
  const [sellStock, setSellStock] = useState(false);

  const [token,setToken] = useState([])

  const handleRefresh = () => {
    setTickr('');
    setAmount('');
    setShares('');
    setData([]);
    setPort([]);
    fetchPort();
    fetchData();
  }

  // handles opening of add stock dialog
  const handleAddStockButton = () => {
    if (addStock) {
      const api = alpacaApi();
      api.trades(tickr).then(data =>{
      if (data["status"] == 200) {
        if (tickr in portfolioDict) {
          fetch('/portfolio/buy', {
          method: 'POST',
          headers: new Headers({
              'Authorization': 'Bearer ' + localStorage.getItem('JWT')
          }),
          body: JSON.stringify({
              "tickr": tickr, "amount": amount, "shares": shares
          })
          } ).then(
          res => {
            if (res.status == 200) {
              setAddStock(false);
              handleRefresh();
            }
            else if (res.status == 403) {
              setAlertMessage("Couldn't verify user.");
              setAlert(true);
            }
            else if (res.status == 400) {
              setAlertMessage("New shares and amount cannot be negative.");
              setAlert(true);
            }
          }
          )
        }
        else {
          fetch('/portfolio/add_stock', {
          method: 'POST',
          headers: new Headers({
              'Authorization': 'Bearer ' + localStorage.getItem('JWT')
          }),
          body: JSON.stringify({
              "tickr": tickr, "amount": amount, "shares": shares
          })
          } ).then(
          res => {
            if (res.status == 200) {
              setAddStock(false);
              handleRefresh();
            }
            else if (res.status == 403) {
              setAlertMessage("Couldn't verify user.");
              setAlert(true);
            }
          })
        }
      }
      else {
        setAlertMessage("Stock name is invalid.");
        setAlert(true);
      }
    });
    }
    else {
      setAddStock(true);
    }
  }

  // handles opening of remove stock dialog
  const handleRemoveStockButton = () => {
    if (removeStock) {
      fetch('/portfolio/remove_stock', {
      method: 'POST',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
      }),
      body: JSON.stringify({
          "tickr": tickr
      })
      } ).then(
      res => {
        if (res.status == 200) {
          setRemoveStock(false);
          handleRefresh();
        }
        else if (res.status == 403) {
          setAlertMessage("Couldn't verify user.");
          setAlert(true);
        }
        else if (res.status == 404) {
          setAlertMessage("Stock could not be found in your portfolio.");
          setAlert(true);
        }
      }); 
    }
    else {
      setRemoveStock(true);
    }
  }

  // handles opening of sell stock dialog
  const handleSellStockButton = () => {
    if (sellStock) {
      fetch('/portfolio/sell', {
      method: 'POST',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
      }),
      body: JSON.stringify({
          "tickr": tickr, "amount": amount, "shares": shares
      })
      } ).then(
      res => {
        if (res.status == 200) {
          setSellStock(false);
          handleRefresh();
        }
        else if (res.status == 403) {
          setAlertMessage("Couldn't verify user.");
          setAlert(true);
        }
        else if (res.status == 400) {
          setAlertMessage("Shares and amount to remove cannot be negative.");
          setAlert(true);
        }
        else if (res.status == 401) {
          setAlertMessage("Cannot sell more shares than you have.");
          setAlert(true);
        }
        else if (res.status == 404) {
          setAlertMessage("Stock could not be found in your portfolio.");
          setAlert(true);
        }
      }
      )
    }
    else {
      setSellStock(true);
    }
  }

  const handleClose = () => {
    setAddStock(false);
    setRemoveStock(false);
    setSellStock(false);
    setAlert(false);
    setAlertMessage('');
  };

  const addStockDialog = (
    <div>
      <Tooltip title="Add Stock">
        <IconButton 
          color="primary"
          onClick={handleAddStockButton}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={addStock} onClose={handleClose}>
        <DialogTitle>Add Stock</DialogTitle>
        <Divider/>
        <Collapse in={alert}>
          <Alert severity='error' sx={{margin: 5}}
            action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
              setAlert(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
            }
            sx={{ mb: 0, mt: 3 }}
          >
          {alertMessage}
          </Alert>
        </Collapse>
        <DialogContent>
          <DialogContentText>
          To add a stock, please enter your stock name, amount invested and share.
          </DialogContentText>
          <TextField
            margin="dense"
            id="standard"
            label="Stock Name"
            value={tickr}
            variant="standard"
            fullWidth
            onChange={(event) => setTickr(event.target.value)}/>
          <TextField
            id="standard"
            label="Amount Invested"
            value={amount}
            variant="standard"
            onChange={(event) => setAmount(event.target.value)}/>
          <TextField
            id="standard"
            label="Shares"
            value={shares}
            variant="standard"
            onChange={(event) => setShares(event.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddStockButton}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
      
  const sellStockDialog = (
    <div>
      <Tooltip title="Sell Stock">
        <IconButton 
          color="primary"
          onClick={handleSellStockButton}
        >
          <RemoveIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={sellStock} onClose={handleClose}>
        <DialogTitle>Sell Stock</DialogTitle>
        <Divider/>
        <Collapse in={alert}>
          <Alert severity='error' sx={{margin: 5}}
            action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
              setAlert(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
            }
            sx={{ mb: 0, mt: 3 }}
          >
          {alertMessage}
          </Alert>
        </Collapse>
        <DialogContent>
          <DialogContentText>
          To sell stocks, please enter the stock name, amount invested and share.
          </DialogContentText>
          <TextField
            margin="dense"
            id="standard"
            label="Stock Name"
            value={tickr}
            variant="standard"
            fullWidth
            onChange={(event) => setTickr(event.target.value)}/>
          <TextField
            id="standard"
            label="Amount invested"
            value={amount}
            variant="standard"
            onChange={(event) => setAmount(event.target.value)}/>
          <TextField
            id="standard"
            label="Shares"
            value={shares}
            variant="standard"
            onChange={(event) => setShares(event.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSellStockButton}>Remove</Button> 
          <Button onClick={handleRemoveStockButton}>Remove All</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  
  return (
    <RenderContext.Consumer>
    {({handleSearch}) => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={8}>
            <Card >
                <CardContent>
                <Typography gutterBottom variant="h6" color="primary">
                  Your Portfolio
                </Typography>
                <ChartComponent />
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h6" color="primary">
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
                    <Typography gutterBottom variant="h6" color="primary">
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
                    <Typography gutterBottom variant="h6" color="primary">
                        Highest Performing stock
                    </Typography>
                    <Typography variant="h5" color="textPrimary" display="inline">
                        {highestPerforming[0]}
                    </Typography>
                    <Typography color="textSecondary" display="inline">
                        &ensp;+{highestPerforming[1].toFixed(2)}%
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
                        {addStockDialog}
                        {sellStockDialog}
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
                          <StyledTableCell>{(portfolio.change).toFixed(2)}%</StyledTableCell>
                          <StyledTableCell>{portfolio.profit}%</StyledTableCell>
                          </StyledTableRow>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
    </Box>
    )}
    </RenderContext.Consumer>
  );
}
