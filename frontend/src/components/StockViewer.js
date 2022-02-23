import React, { useContext, useEffect, useState } from 'react';
import StockViewerContext from './StockViewerContext';
import CandleStickChartWithMACDIndicator from './Charts/MACDchart';
import { Box } from '@mui/material';
import { Grid, Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import alpacaApi from './StockPage/services/polygon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddRounded';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { parseResponse } from './Charts/utils';
import { CardActionArea } from '@mui/material';
import { CardMedia } from '@mui/material';
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


class ChartComponent extends React.Component {
	componentDidMount() {
    const api = alpacaApi();
		api.getBars(this.props.search, '2010-03-12T23:20:50.52Z', '1Day').then(data => {
			this.setState(data)
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
    const parsedData = parseResponse(this.state);
    
		return (
			<CandleStickChartWithMACDIndicator type='hybrid' data={parsedData} />
      
		)
	}
}

class NewsComponent extends React.Component {
  
	componentDidMount() {
    const api = alpacaApi();
    api.news(this.props.stock).then(news => {
        this.setState(news['data']['news']);    
    });
    
	}
	render() {
		if (this.state == null) {
			return(
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div" color="primary">
                        News
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Loading....
                    </Typography>
                </CardContent>
            ) 
		}
		return (
			<CardContent>
                <Typography gutterBottom variant="h4" component="div" color="primary">
                    News
                </Typography>
                <br></br>
                <Card sx={{ minWidth: 345 }}>
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
                <Card sx={{ minWidth: 345 }}>
                    <CardActionArea  href={this.state[1]['url']} target="_blank">
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
                <Card sx={{ minWidth: 345 }}>
                    <CardActionArea  href={this.state[2]['url']} target="_blank">
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
                <Card sx={{ minWidth: 345 }}>
                    <CardActionArea  href={this.state[3]['url']} target="_blank">
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
                <Card sx={{ minWidth: 345 }}>
                    <CardActionArea  href={this.state[4]['url']} target="_blank">
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
		)
	}
}


class StockDataComponent extends React.Component {
  
	componentDidMount() {
    
    const search = this.props.search
    const api = alpacaApi();
    api.mutiquotes(search).then(data => {
      this.setState(data);
    })
    
	}
  
  reload = () => 
  {
    //RELOAD COMPONENT
    this.componentDidMount();
  };

	render() {
     
    
		if (this.state == null) {
			return <div>Loading...</div>
		}
    
    let stockData;
    if(this.state.data[this.props.search] == null){
      return(
        <StockDataComponent search={this.props.search} />
      );
    }
    else{
      stockData = this.state['data'][this.props.search];
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

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

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

    
  

    const change = ((stockData.latestTrade.p - stockData.dailyBar.o) / stockData.dailyBar.o).toFixed(2);

		return (
			
        <TableContainer component={Paper}>
                <Table  aria-label="customized table">
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
        
		)
	}
}

function StockViewer() {
  const search = useContext(StockViewerContext).finalSearch;
  
		
  const [tickr, setTickr] = useState('');
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [addStock, setAddStock] = useState(false);
  
 

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


  return (
    
    <Box sx={{ flexGrow: 1 }}>
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
                
                  <ChartComponent search={search}/>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
          <StockDataComponent search={search} />
        </Grid>
        <Grid item xs={6}>
          <NewsComponent stock={search}/>
        </Grid>
      </Grid>
    </Box>
  )

}

export default StockViewer;