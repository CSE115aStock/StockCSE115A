import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
import MarketTrends from './MarketTrends';
import Settings from './Settings';
import Profile from './Profile';
import Search from './StockViewer';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import StockViewerContext from './StockViewerContext';
import {useNavigate} from 'react-router-dom';
import RenderContext from './RenderContext';


const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#333a56',
    },
    secondary: {
      main: '#52658f',
    },
    background: {
      default: '#f1f1e4',
      paper: '#f7f5e6',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

// style for search
const SearchStyle = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    'backgroundColor': alpha(theme.palette.common.white, 0.25),
  },
}));


// style input text
const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
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
  const [market, setMarket] = React.useState(false);
  const [portfolio, setPortfolio] = React.useState(false);

  // hook for profile menu options
  const [profile, setProfile] = React.useState(false);
  const [settings, setSettings] = React.useState(false);

  const [search, setSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [finalSearch, setFinalSearch] = React.useState('');
  const navigate = useNavigate();

  /**
   * Description: Sets drawer to mobile screen size setting.
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Description: Changes the menu setting to open or closed.
   */
  const handleProfileMenuToggle = () => {
    setPfOpen(!pfOpen);
  };

  /**
   * Description: Sets the right component to true so it appears
   * on the screen.
   * @param {bool} dashVal
   * @param {bool} marketVal
   * @param {bool} profVal
   * @param {bool} settVal
   * @param {bool} searVal
   * @param {bool} portVal
   * @param {bool} lcVal
   */
  const handlePages = (dashVal, marketVal, profVal, settVal,
      searVal, portVal) => {
    setDash(dashVal);
    setMarket(marketVal);
    setProfile(profVal);
    setSettings(settVal);
    setSearch(searVal);
    setPortfolio(portVal);
    setSearchValue('');
    setFinalSearch('');
  };

  /**
   * Description: Sets stock viewer on screen if the
   * value in the search bar is nonempty. Triggered by
   * clicking the search icon.
   * @param {string} val
   */
  const handleSearch = (val) => {
    if (val.length > 0) {
      setDash(false);
      setMarket(false);
      setProfile(false);
      setSettings(false);
      setSearch(true);
      setPortfolio(false);
      setSearchValue('');
      setFinalSearch(val.toUpperCase());
    }
  };

  /**
   * Description: Sets all components to false and calls log out
   * backend. Navigates to log in page.
   */
  const handleLogOut = () => {
    setDash(false);
    setMarket(false);
    setProfile(false);
    setSettings(false);
    setSearch(false);
    setPortfolio(false);
    setSearchValue('');
    setFinalSearch('');
    fetch('auth/logout', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
    })
        .then(
            (res) => {
              localStorage.clear();
              navigate('/');
            },
        )
        .catch((err) => {
          alert('Error logging out, please try again');
        });
  };


  const sideDrawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key='Dashboard'
          onClick={() =>
            handlePages(true, false, false, false, false, false)}>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button key='Portfolio'
          onClick={() =>
            handlePages(false, false, false, false, false, true)} >
          <ListItemIcon>
            <BarChartIcon/>
          </ListItemIcon>
          <ListItemText primary='Portfolio' />
        </ListItem>
        <ListItem button key='Market Filter'
          onClick={() =>
            handlePages(false, true, false, false, false, false)} >
          <ListItemIcon>
            <ShowChartIcon/>
          </ListItemIcon>
          <ListItemText primary='Market Filter' />
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
      <MenuItem onClick={() =>
        handlePages(false, false, true, false, false, false)}>
        Profile
      </MenuItem>
      <MenuItem onClick={() =>
        handlePages(false, false, false, true, false, false)}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );


  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Box>
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
                  'fontSize': 30, 'width': drawerWidth}}
              >
                Social Stock
              </Typography>
              <SearchStyle>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='notifications'
                  color='inherit'
                  onClick={() => handleSearch(searchValue)}
                >
                  <SearchIcon />
                </IconButton>
                <StyledInputBase
                  placeholder='Search…'
                  inputProps={{'aria-label': 'search'}}
                  sx={{'width': '25%', 'm': 1}}
                  onChange={(event) => setSearchValue(event.target.value)}
                  value={searchValue}
                />
              </SearchStyle>
              <Box sx={{flexGrow: 1}} />
              <Box sx={{display: {md: 'flex'}}}>
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
            sx={{width: {sm: drawerWidth},
              flexShrink: {sm: 0}, display: 'flex'}}
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
        <Box
          component="main"
          sx={{flexGrow: 1, p: 3,
            width: {sm: `calc(100% - ${drawerWidth}px)`}, height: '100vh'}}
        >
          <Toolbar />
          {dash? <RenderContext.Provider value={{handleSearch}}>
            <Dashboard /> </RenderContext.Provider> : null}
          {market? <MarketTrends /> : null}
          {portfolio? <RenderContext.Provider value={{handleSearch}}>
            <Portfolio /> </RenderContext.Provider> : null}
          {profile? <RenderContext.Provider value={{handleSearch}}>
            <Profile /> </RenderContext.Provider> : null}
          {settings? <Settings /> : null}
          {search? <StockViewerContext.Provider value={{finalSearch}}>
            <Search /> </StockViewerContext.Provider> : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
