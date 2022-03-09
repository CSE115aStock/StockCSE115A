import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import RenderContext from './RenderContext';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {createTheme} from '@mui/material/styles';

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

/**
 *
 * @return {object} JSX
 */
export default function Profile() {
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    getLikes();
  }, []);

  const getLikes = () => {
    fetch('social/user_likes', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              setLikes(data);
            },
        );
  };

  return (
    <RenderContext.Consumer>
      {({handleSearch}) => (
        <div>
          <Box
            sx={{
              'display': 'flex',
              'm': 0.5,
              'flexWrap': 'wrap',
              '& > :not(style)': {
                width: '100%',
              },
            }}
          >
            <Paper elevation={3}>
              <Typography variant="h6" gutterBottom component="div"
                padding={1} color={darkTheme.palette.secondary.main}
                style={{fontWeight: 600}} sx={{m: 1}}>
                SOCIAL ACTIVITY
              </Typography>
              <Divider/>
              <Typography variant="h6" gutterBottom component="div"
                padding={1} color={darkTheme.palette.secondary.main}
                sx={{m: 1}}>
                LIKES:
              </Typography>
              <Grid container spacing={2}>
                {likes?.map((item) => (
                  <Grid item key={item[0]}>
                    <Card variant="outlined"
                      onClick={() => handleSearch(item[0])}
                      sx={{'background': '#fbfbf0', 'width': 100,
                        'm': 2, 'textAlign': 'center', 'p': 2}}>
                      {item[0]}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </div>
      )}
    </RenderContext.Consumer>
  );
}
