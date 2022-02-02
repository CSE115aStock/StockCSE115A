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


const worth = 5000;
const astock = "AAPL";
const capitalInvested = 4000;
var performance = (worth - capitalInvested) /100;
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

function createData(amount, stock, profit) {
    return { amount, stock, profit};
  }
const rows = [
    createData(100, "AMC", -6.0),
    createData(100, "AAPL", 2.0),
];

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={8}>
            <Card >
                <CardContent>
                <Typography gutterBottom variant="h6" component="div" color="primary">
                    Today
                </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }} >
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Current Value
                    </Typography>
                    <Typography variant="h4" color="txtPrimary">
                        ${worth}
                    </Typography>
                    </CardContent>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345 }} >
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Portoflio Performance
                    </Typography>
                    <Typography variant="h5" color="textPrimary" display="inline">
                        {performance}%
                    </Typography>
                    </CardContent>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345 }} >
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Highest Performing stock
                    </Typography>
                    <Typography variant="h5" color="textPrimary" display="inline">
                        {astock}
                    </Typography>
                    <Typography color="textSecondary" display="inline">
                        &ensp;+{percentage}%
                    </Typography>
                    </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6}>
        
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
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
                    {rows.map((row) => (
                        <StyledTableRow>
                        <StyledTableCell>
                            {row.stock}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.amount}</StyledTableCell>
                        <StyledTableCell align="right">{row.profit}%</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        <Grid item xs={6}>
        <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                    <Typography variant="h5" color="textPrimary" margin="10px">
                        Top Movers
                    </Typography>
                    <TableRow>
                        <StyledTableCell>Stock</StyledTableCell>
                        <StyledTableCell align="center">Amount</StyledTableCell>
                        <StyledTableCell align="right">Profit</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow>
                        <StyledTableCell>
                            {row.stock}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.amount}</StyledTableCell>
                        <StyledTableCell align="right">{row.profit}%</StyledTableCell>
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
