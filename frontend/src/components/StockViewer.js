import React, {useContext, useEffect, useState} from 'react';
import StockViewerContext from './StockViewerContext';
import CandleStickChartWithMACDIndicator from './Charts/MACDchart';
import {Box} from '@mui/material';
import {Grid, Card, CardContent} from '@mui/material';
import {Typography} from '@mui/material';
import alpacaApi from './StockPage/services/polygon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {createTheme} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddRounded';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import {Paper} from '@mui/material';
import {styled} from '@mui/material/styles';
import {parseResponse} from './Charts/utils';
import {CardActionArea} from '@mui/material';
import {CardMedia} from '@mui/material';
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
import Button from '@mui/material/Button';
import Social from './Social';


/**
 * Description: This function pulls the stock bar data from the alpacas api.
 * It sends the fetched data to the chart.
 * It is called when the search page reloads.
 * @param {*} search
 * @return {Object} JSX
 */
function chart(search) {
  const [stockData, setStockData] = useState();
  useEffect(() =>{
    const api = alpacaApi();
    api.getBars(search, '2010-03-12T23:20:50.52Z', '1Day').then((data) => {
      setStockData(data);
    });
  }, [search]);

  if (stockData != null) {
    if (stockData['data']['bars'] == null) {
      console.log(stockData);
      return (
        <Typography variant="h4" color="secondary" align='center'>
          {search} is not an available ticker.
        </Typography>
      );
    }
    const parsedData = parseResponse(stockData);

    return (
      <CandleStickChartWithMACDIndicator type='hybrid' data={parsedData} />

    );
  }
}

/**
 * Description: This function pulls the stock news data from the alpacas api.
   * And creates a 5 cards with news information and pictures.
   * It is called when the search page reloads.
 * @param {*} search
 * @return {Object} JSX
 */
function news(search) {
  const [news, setNews] = useState();
  useEffect(() =>{
    const api = alpacaApi();
    api.news(search).then((news) => {
      setNews(news['data']['news']);
    });
  }, [search]);

  if (news != null) {
    if (news[0] == null) {
      return;
    }
    return (
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" color="primary">
            News
        </Typography>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={news[0]['url']} target="_blank">
            {news[0]['images'].length > 0 &&
                    <CardMedia
                      component="img"
                      height="150"
                      image={news[0]['images'][0]['url']}
                      alt="Uable to load image"
                    />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {news[0]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news[0]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={news[1]['url']} target="_blank">
            {news[1]['images'].length > 0 &&
                        <CardMedia
                          component="img"
                          height="150"
                          image={news[1]['images'][0]['url']}
                          alt="Uable to load image"
                        />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {news[1]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news[1]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={news[2]['url']} target="_blank">
            {news[2]['images'].length > 0 &&
                        <CardMedia
                          component="img"
                          height="150"
                          image={news[2]['images'][0]['url']}
                          alt="Uable to load image"
                        />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {news[2]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news[2]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={news[3]['url']} target="_blank">
            {news[3]['images'].length > 0 &&
                        <CardMedia
                          component="img"
                          height="150"
                          image={news[3]['images'][0]['url']}
                          alt="Uable to load image"
                        />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {news[3]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news[3]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={news[4]['url']} target="_blank">
            {news[4]['images'].length > 0 &&
                        <CardMedia
                          component="img"
                          height="150"
                          image={news[4]['images'][0]['url']}
                          alt="Uable to load image"
                        />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {news[4]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news[4]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </CardContent>
    );
  }
}

/**
 * Description: This function pulls the stock data from the alpacas api.
 * And creates a table with stock information.
 * It is called when the search page reloads.
 * @param {*} search
 * @return {Object} JSX
 */
function stockData(search) {
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

  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: darkTheme.palette.primary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [stockData, setStockData] = useState();
  useEffect(() =>{
    const api = alpacaApi();
    api.mutiquotes(search).then((data) => {
      setStockData(data['data'][search]);
    });
  }, [search]);


  if (stockData != null) {
    const change = ((stockData.latestTrade.p - stockData.dailyBar.o) /
      stockData.dailyBar.o).toFixed(2);
    return (

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Asking Price</StyledTableCell>
              <StyledTableCell>Bid Price</StyledTableCell>
              <StyledTableCell>Daily Open</StyledTableCell>
              <StyledTableCell>Daily High</StyledTableCell>
              <StyledTableCell>Daily Low</StyledTableCell>
              <StyledTableCell>Daily Close</StyledTableCell>
              <StyledTableCell>Change Today</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>${stockData.latestTrade.p}</StyledTableCell>
              <StyledTableCell>${stockData.latestQuote.ap}</StyledTableCell>
              <StyledTableCell>${stockData.latestQuote.bp}</StyledTableCell>
              <StyledTableCell>${stockData.dailyBar.o}</StyledTableCell>
              <StyledTableCell>${stockData.dailyBar.h}</StyledTableCell>
              <StyledTableCell>${stockData.dailyBar.l}</StyledTableCell>
              <StyledTableCell>${stockData.dailyBar.c}</StyledTableCell>
              <StyledTableCell>{change}%</StyledTableCell>
            </StyledTableRow>

          </TableBody>
        </Table>
      </TableContainer>

    );
  }
}

/**
 * Description: This function calls the necesarry functions to depict stock
 * information. And has the logic to add a stock to the user's portfolio.
 * It is called when a new search is made.
 * @return {Object} JSX
 */
function StockViewer() {
  const search = useContext(StockViewerContext).finalSearch;


  const [tickr, setTickr] = useState(search);
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [addStock, setAddStock] = useState(false);

  const [port, setPort] = useState([]);
  useEffect(() => {
    fetch('/portfolio/my_portfolio', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('JWT'),
      }),
      body: JSON.stringify({

      }),
    }).then(
        (res) => res.json(),
    ).then(
        (port) => {
          setPort(port[0]);
        },
    );
  }, []);


  // handles opening of add stock dialog
  const handleAddStockButton = () => {
    if (addStock) {
      const api = alpacaApi();
      api.trades(tickr).then((data) =>{
        if (data['status'] == 200) {
          if (tickr in port) {
            fetch('/portfolio/buy', {
              method: 'POST',
              headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('JWT'),
              }),
              body: JSON.stringify({
                'tickr': tickr, 'amount': amount, 'shares': shares,
              }),
            } ).then(
                (res) => {
                  if (res.status == 200) {
                    setAddStock(false);
                  } else if (res.status == 403) {
                    setAlertMessage('Couldn\'t verify user.');
                    setAlert(true);
                  } else if (res.status == 400) {
                    setAlertMessage('New shares and amount',
                        ' cannot be negative.');
                    setAlert(true);
                  }
                },
            );
          } else {
            fetch('/portfolio/add_stock', {
              method: 'POST',
              headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('JWT'),
              }),
              body: JSON.stringify({
                'tickr': tickr, 'amount': amount, 'shares': shares,
              }),
            } ).then(
                (res) => {
                  if (res.status == 200) {
                    setAddStock(false);
                  } else if (res.status == 403) {
                    setAlertMessage('Couldn\'t verify user.');
                    setAlert(true);
                  }
                });
          }
        } else {
          setAlertMessage('Stock name is invalid.');
          setAlert(true);
        }
      });
    } else {
      setAddStock(true);
    }
  };

  const handleClose = () => {
    setAddStock(false);
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
          <Alert severity='error'
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
            sx={{mb: 0, mt: 3, margin: 5}}
          >
            {alertMessage}
          </Alert>
        </Collapse>
        <DialogContent>
          <DialogContentText>
          To add a stock, please enter your stock name,
          amount invested and share.
          </DialogContentText>
          <TextField
            margin="dense"
            id="standard"
            label="Stock Name"
            value={tickr}
            variant="standard"
            fullWidth
            onChange={(event) => setTickr((event.target.value).toUpperCase())}/>
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
  );


  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card >
            <CardContent>
              <Toolbar>
                <Typography variant="h4" color="secondary" margin="10px">
                  {search}
                </Typography>
                {addStockDialog}
              </Toolbar>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card >
            <CardContent>
              {chart(search)}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {stockData(search)}
        </Grid>
        <Grid item xs={6}>
          {news(search)}
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h4" component="div"
            color="primary" margin="15px">
              Social
          </Typography>
          <StockViewerContext.Provider value={{search}}>
            <Social/>
          </StockViewerContext.Provider>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StockViewer;
