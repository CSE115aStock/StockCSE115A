import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const drawerWidth = 240;

// style for search
const SearchStyle = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    'backgroundColor': alpha(theme.palette.common.white, 0.25),
  },
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '70%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// style for search icon
const SearchIconStyle = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// style input text
const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 * @return {object} HomePage
 */
export default function HomePage() {
  // hook for profile menu
  const [pfOpen, setPfOpen] = React.useState(false);

  // hook for mobile drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // hook for dashboard and market trends
  const [dash, setDash] = React.useState(true);

  // function for opening/closing drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function for opening/closing profile menu
  const handleProfileMenuToggle = () => {
    setPfOpen(!pfOpen);
  };

  // function to change dash/market trend
  const handleDashtoMarket = () => {
    setDash(!dash);
  };


  const sideDrawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key='Dashboard'>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button key='Market Trends' onClick={handleDashtoMarket} >
          <ListItemIcon>
            <ShowChartIcon/>
          </ListItemIcon>
          <ListItemText primary='Market Trends' />
        </ListItem>
      </List>
    </div>
  );

  const profileMenu = (
    <Menu
      anchorEl={pfOpen}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='profileMenu'
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={pfOpen}
      onClose={handleProfileMenuToggle}
    >
      <MenuItem onClick={handleProfileMenuToggle}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuToggle}>My account</MenuItem>
    </Menu>
  );


  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {xs: 'block', sm: 'none'}}}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{'display': {xs: 'none', sm: 'block'},
              'font-size': 30, 'width': drawerWidth}}
          >
            Social Stock
          </Typography>
          <SearchStyle>
            <SearchIconStyle>
              <SearchIcon />
            </SearchIconStyle>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{'aria-label': 'search'}}
            />
          </SearchStyle>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {md: 'flex'}}}>
            <IconButton
              size='large'
              edge='end'
              aria-label='notifications'
              color='inherit'
            >
              <Badge badgeContent={4} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              onClick={handleProfileMenuToggle}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}, display: 'flex'}}
        aria-label='features'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            'display': {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {sideDrawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            'display': {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {sideDrawer}
        </Drawer>
      </Box>
      {profileMenu}
    </Box>
  );
}
