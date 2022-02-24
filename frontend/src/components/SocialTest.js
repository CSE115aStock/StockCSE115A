import React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';

export default function SocialTest() {
    return (
        <div>
          <Card>
            <Paper elevation={2} sx={{width: '80%', m: 2, align: 'center', 'text-justify': 'distribute-all-lines'}}>
              <Typography sx={{'text-align': 'left', top: 0, left: 0, display: 'inline'}}>
                First Last
              </Typography>
              <Typography sx={{top: 0, right: 0, display: 'inline', float: 'right'}}>
                Date
              </Typography>
              <Typography>
                Comment
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{width: '80%', m: 2, align: 'center', 'text-justify': 'distribute-all-lines'}}>
              <Typography sx={{'text-align': 'left', top: 0, left: 0, display: 'inline'}}>
                First Last
              </Typography>
              <Typography sx={{top: 0, right: 0, display: 'inline', float: 'right'}}>
                Date
              </Typography>
              <Typography>
                  Comment
              </Typography>
            </Paper>
            Social
          </Card>
        </div>
    )

}