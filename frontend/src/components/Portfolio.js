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
import Chart from './Charts/MACDchart';
import { getData } from "./Charts/utils";
import { useState, useEffect } from 'react';
import alpacaApi from './StockPage/services/polygon';
import RenderContext from './RenderContext';

import AddIcon from '@mui/icons-material/AddRounded';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import RemoveIcon from '@mui/icons-material/RemoveRounded';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
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

  const [tickr, setTickr] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [shares, setShares] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
 
  // hook for edit stock options
  const [addStock, setAddStock] = React.useState(false);
  const [removeStock, setRemoveStock] = React.useState(false);
  const [buyStock, setBuyStock] = React.useState(false);
  const [sellStock, setSellStock] = React.useState(false);

  const [token,setToken] = useState([])

  const handleRefresh = () => {
    fetchPort();
    fetchData();
    setTickr('');
    setAmount('');
    setShares('');
  }

  // handles opening of add stock dialog
  const handleAddStockButton = () => {
    setAddStock(false);
    fetch('/portfolio/add_stock', {
    method: 'POST',
    headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('JWT')
    }),
    body: JSON.stringify({
        "tickr": tickr, "amount": amount, "shares": shares
    })
    } ).then(
    res => res.json()
    ).then(
      data => {
        handleRefresh();
        setToken(data);
        console.log(data)
      }
    ).catch(err => {
      setAlertMessage(err.message);
      setAlert(true);
    }
    )
  }

    // handles opening of remove stock dialog
    const handleRemoveStockButton = () => {
      setRemoveStock(false);
      fetch('/portfolio/remove_stock', {
      method: 'POST',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
      }),
      body: JSON.stringify({
          "tickr": tickr, "amount": amount, "shares": shares
      })
      } ).then(
      res => res.json()
      ).then(
        data => {
          handleRefresh();
          setToken(data);
          console.log(data)
        }
      // ).catch(err => {
      //   console.log(err.message);
      // }
      )
    }

    // handles opening of buy stock dialog
    const handleBuyStockButton = () => {
      setBuyStock(false);
      fetch('/portfolio/buy', {
      method: 'POST',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
      }),
      body: JSON.stringify({
          "tickr": tickr, "amount": amount, "shares": shares
      })
      } ).then(
      res => res.json()
      ).then(
        data => {
          handleRefresh();
          setToken(data);
          console.log(data)
        }
      )
    }

    // handles opening of sell stock dialog
    const handleSellStockButton = () => {
      setSellStock(false);
      fetch('/portfolio/sell', {
      method: 'POST',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
      }),
      body: JSON.stringify({
          "tickr": tickr, "amount": amount, "shares": shares
      })
      } ).then(
      res => res.json()
      ).then(
        data => {
          handleRefresh();
          setToken(data);
          console.log(data)
        }
      )
    }
  
    // function to add/remove stock
    const handleAddStock = () => {
      setAddStock(true);
    };
  
    const handleRemoveStock = () => {
      setRemoveStock(true);
    };
  
    const handleBuyStock = () => {
      setBuyStock(true);
    };
  
    const handleSellStock = () => {
      setSellStock(true);
    };
  
    const handleClose = () => {
      setAddStock(false);
      setRemoveStock(false);
      setBuyStock(false);
      setSellStock(false);
    };
  
    const addStockDialog = (
      <div>
        <Tooltip title="Add Stock">
          <IconButton 
            color="primary"
            onClick={handleAddStock}
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
  
    const removeStockDialog = (
      <div>
        <Tooltip title="Remove Stock">
        <IconButton 
          color="primary"
          onClick={handleRemoveStock}
        >
          <RemoveIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={removeStock} onClose={handleClose}>
        <DialogTitle>Remove Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To remove a stock, please enter your stock name.
          </DialogContentText>
          <TextField
            margin="dense"
            id="standard"
            label="Stock Name"
            value={tickr}
            variant="standard"
            fullWidth
            onChange={(event) => setTickr(event.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveStockButton}>Remove</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  
    const buyStockDialog = (
      <div>
        <Tooltip title="Buy Stock">
          <IconButton 
            color="primary"
            onClick={handleBuyStock}
          >
            <PlaylistAddOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={buyStock} onClose={handleClose}>
          <DialogTitle>Buy Stock</DialogTitle>
          <DialogContent>
            <DialogContentText>
            To buy stocks, please enter your stock name, amount invested and share.
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
            <Button onClick={handleBuyStockButton}>Buy</Button>
          </DialogActions>
          </Dialog>
      </div>
    )
        
    const sellStockDialog = (
      <div>
        <Tooltip title="Sell Stock">
          <IconButton 
            color="primary"
            onClick={handleSellStock}
          >
            <PlaylistRemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={sellStock} onClose={handleClose}>
          <DialogTitle>Sell Stock</DialogTitle>
          <DialogContent>
            <DialogContentText>
            To sell stocks, please enter your stock name, amount invested and share.
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
            <Button onClick={handleSellStockButton}>Sell</Button>
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
                        {removeStockDialog}
                        {buyStockDialog}
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
