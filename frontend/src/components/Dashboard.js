import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {createTheme} from '@mui/material';
import {useState, useEffect} from 'react';
import {CardActionArea} from '@mui/material';
import {CardMedia} from '@mui/material';
import alpacaApi from './StockPage/services/polygon';
import RenderContext from './RenderContext';

/**
 * @return {Object} JSX
 */
class NewsComponent extends React.Component {
  /**
   * This function loads the user's portfolio.
   */
  componentDidMount() {
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
          let stocks = '';
          for (const stock in port[0]) {
            if (stocks == '') {
              stocks = stocks + stock;
            } else {
              stocks = stocks + ',' + stock;
            }
          }
          const api = alpacaApi();
          api.news(stocks).then((news) => {
            this.setState(news['data']['news']);
          });
        },
    );
  }
  /**
   *
   * @return {Object} JSX
   */
  render() {
    if (this.state == null) {
      return (
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color="primary">
                        Today&apos;s News
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
                        Loading....
          </Typography>
        </CardContent>
      );
    }
    return (
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" color="primary">
                    Today&apos;s News
        </Typography>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={this.state[0]['url']} target="_blank">
            {this.state[0]['images'].length > 0 &&
                            <CardMedia
                              component="img"
                              height="150"
                              image={this.state[0]['images'][0]['url']}
                              alt="Uable to load image"
                            />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state[0]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state[0]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={this.state[1]['url']} target="_blank">
            {this.state[1]['images'].length > 0 &&
                                <CardMedia
                                  component="img"
                                  height="150"
                                  image={this.state[1]['images'][0]['url']}
                                  alt="Uable to load image"
                                />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state[1]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state[1]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={this.state[2]['url']} target="_blank">
            {this.state[2]['images'].length > 0 &&
                                <CardMedia
                                  component="img"
                                  height="150"
                                  image={this.state[2]['images'][0]['url']}
                                  alt="Uable to load image"
                                />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state[2]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state[2]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={this.state[3]['url']} target="_blank">
            {this.state[3]['images'].length > 0 &&
                                <CardMedia
                                  component="img"
                                  height="150"
                                  image={this.state[3]['images'][0]['url']}
                                  alt="Uable to load image"
                                />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state[3]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state[3]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
        <Card sx={{minWidth: 345}}>
          <CardActionArea href={this.state[4]['url']} target="_blank">
            {this.state[4]['images'].length > 0 &&
                                <CardMedia
                                  component="img"
                                  height="150"
                                  image={this.state[4]['images'][0]['url']}
                                  alt="Uable to load image"
                                />
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state[4]['headline']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state[4]['summary']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </CardContent>
    );
  }
}


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

/**
 *
 * @return {Object} JSX
 */
export default function Dashboard() {
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
          setPort(port);
        },
    );
  }, []);

  const [data, setData] = useState([]);
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
          let stocks = '';
          for (const stock in port[0]) {
            if (stocks == '') {
              stocks = stocks + stock;
            } else {
              stocks = stocks + ',' + stock;
            }
          }
          const api = alpacaApi();
          api.mutiquotes(stocks).then((data) => {
            setData(data['data']);
          });
        },
    );
  }, []);

  /**
   *
   * @param {*} stock
   * @param {*} amount
   * @param {*} shares
   * @param {*} price
   * @param {*} high
   * @param {*} low
   * @param {*} closing
   * @return {Object} details
   */
  function createData(stock, amount, shares, price, high, low, closing) {
    const change = (((price - closing) / closing) * 100);
    const profit = ((price - (amount / shares)) /
      (amount / shares) * 100).toFixed(2);
    return {stock, amount, shares, price, high, low, change, profit};
  }

  let performance = 0.0;
  let worth = 0.0;
  let capitalInvested = 0;
  let highestPerforming = [0, 0];
  const portfolioDict = port[0];
  const portfolio = [];
  if (portfolioDict != null && Object.keys(portfolioDict).length != 0) {
    for (const key in portfolioDict, data) {
      if (portfolioDict.hasOwnProperty(key)) {
        portfolio.push(createData(key, portfolioDict[key]['amount'],
            portfolioDict[key]['shares'],
            data[key]['latestTrade']['p'], data[key]['dailyBar']['h'],
            data[key]['dailyBar']['l'], data[key]['prevDailyBar']['c'],
        ));
        capitalInvested += parseInt(portfolioDict[key]['amount']);
        worth += data[key]['latestTrade']['p'] * portfolioDict[key]['shares'];
        if (highestPerforming[0] == 0) {
          highestPerforming = [key, portfolio[portfolio.length - 1].change];
        } else {
          if (highestPerforming[1] < portfolio[portfolio.length - 1].change) {
            highestPerforming = [key, portfolio[portfolio.length - 1].change];
          }
        }
      }
    }
  }
  worth = worth.toFixed(2);
  performance =
    (((worth - capitalInvested) / capitalInvested) * 100).toFixed(2);

  return (
    <RenderContext.Consumer>
      {({handleSearch}) => (
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2} >
            <Grid item xs={8}>
              <Card sx={{minHeight: 382.5}}>
                <NewsComponent />
              </Card>

            </Grid>
            <Grid item xs={4}>
              <Card sx={{maxWidth: 345}} >
                <CardContent>
                  <Typography gutterBottom variant="h6"
                    component="div" color="primary">
                                Portoflio Performance
                  </Typography>
                  <Typography variant="h5" color="textPrimary"
                    display="inline">
                    {performance}%
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <Card sx={{maxWidth: 345}} >
                <CardContent>
                  <Typography gutterBottom variant="h6"
                    component="div" color="primary">
                                Highest Performing stock
                  </Typography>
                  <Typography variant="h5"
                    color="textPrimary" display="inline">
                    {highestPerforming[0]}
                  </Typography>
                  <Typography color="textSecondary" display="inline">
                                &ensp;{highestPerforming[1].toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <TableContainer component={Paper} sx={{maxWidth: 345}}>
                <Table aria-label="customized table">
                  <TableHead>
                    <Typography variant="h5" color="textPrimary" margin="10px">
                                    Portfolio
                    </Typography>
                    <TableRow>
                      <StyledTableCell>Stock</StyledTableCell>
                      <StyledTableCell align="center">Amount</StyledTableCell>
                      <StyledTableCell align="right">Profit</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolio.map((portfolio) => (
                      <StyledTableRow key={portfolio}>
                        <StyledTableCell>
                          {portfolio.stock}
                        </StyledTableCell>
                        <StyledTableCell align="center">{portfolio.amount}
                        </StyledTableCell>
                        <StyledTableCell align="right">{(portfolio.profit)}%
                        </StyledTableCell>
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
