import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RenderContext from './RenderContext';
import { Button } from '@mui/material';



export default function Profile() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <RenderContext.Consumer>
        {({handleSearch}) => (
      <div>
      <Box
        sx={{
          display: 'flex',
          m: 0.5,
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h6" gutterBottom component="div" padding={1} color='#f50057'style={{ fontWeight: 600 }} sx={{ m: 1,}}>
            MY DETAILS
          </Typography>
          <Divider/>
          <FormControl sx={{ m: 2,}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Investor Type</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Type 1" />
                <FormControlLabel value="male" control={<Radio />} label="Type 2" />
              </RadioGroup>
            </FormControl>
        </Paper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          m: 0.5,
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h6" gutterBottom component="div" padding={1} color='#f50057'style={{ fontWeight: 600 }} sx={{ m: 1,}}>
            MY LIKES
          </Typography>
          <Divider/>
          <Button variant="outlined" sx={{ m: 2,}} onClick={() => handleSearch('TEST')}>Test Stock Viewer</Button>
        </Paper>
      </Box>
      </div>
      )}
      </RenderContext.Consumer>
    );
  }