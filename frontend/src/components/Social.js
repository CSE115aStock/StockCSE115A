import React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import StockViewerContext from './StockViewerContext';


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
 * Description: This component displays the likes and comments for the stock.
 * The tickr is communicated to this component using a context provider.
 * @return {object} JSX
 */
export default function Social() {
  const [numLikes, setNumLikes] = React.useState(0);
  const [numComments, setNumComments] = React.useState(0);
  const [comments, setComments] = React.useState([]);
  const finSearch = React.useContext(StockViewerContext).search;
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [liked, setLiked] = React.useState(false);
  const [allVisible, setAllVisible] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');

  React.useEffect(() => {
    getNumLikes();
    getNumComments();
    getComments();
    checkLiked();
    getUsername();
  }, [finSearch]);

  /**
   * Description: This function uses the token to get the current user's
   * username in order to check for user's comments.
   */
  const getUsername = () => {
    fetch('auth/user', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              setUsername(data.username);
            },
        );
  };

  /**
   * Description: This comment sets the liked state using the liked endpoint
   * in the backend. The liked state describes whether the user has
   * liked this stock.
   * Input: -
   * Output: Liked set to backend return.
   */
  const checkLiked = () => {
    fetch('social/liked', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch,
      }),
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              if (data > 0) {
                setLiked(true);
              }
            },
        );
  };

  /**
   * Description: This function sets the number of likes using the total_likes
   * endpoint in the backend.
   * Input: -
   * Output: numLikes set to back end data.
   */
  const getNumLikes = () => {
    fetch('social/total_likes', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch,
      }),
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              setNumLikes(data);
            },
        );
  };

  /**
   * Description: This function gets the number of comments the stock has
   * using the total_comments endpoint. It also sets whether all the comments
   * will be displayed initially by checking if the count is under 6.
   * Input: -
   * Output: numComments and allVisible are updated
   */
  const getNumComments = () => {
    fetch('social/total_comments', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch,
      }),
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              if (data <= 5) {
                setAllVisible(true);
              }
              setNumComments(data);
            },
        );
  };

  /**
   * Description: This function handles when the user likes the stock.
   * It calls the add_like endpoint and confirms the request was
   * successful.
   * Input: -
   * Output: Adds like to likes database and updates liked.
   */
  const handleLike = () => {
    if (!liked) {
      fetch('social/add_like', {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
        body: JSON.stringify({
          'tickr': finSearch,
        }),
      })
          .then(
              (res) => {
                if (res.status != 200) {
                  setAlertMessage('Error adding like.');
                  setAlert(true);
                } else {
                  getNumLikes();
                  setLiked(true);
                }
              },
          );
    } else {
      fetch('social/remove_like', {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
        body: JSON.stringify({
          'tickr': finSearch,
        }),
      })
          .then(
              (res) => {
                if (res.status != 200) {
                  setAlertMessage('Error removing like.');
                  setAlert(true);
                } else {
                  getNumLikes();
                  setLiked(false);
                }
              },
          );
    }
  };

  /**
   * Description: This function retrieves the comment for this stock using the
   * fetch_latest_comments endpoint. It formats the dates using the fixDates
   * function and then saves it in the comments array.
   */
  const getComments = () => {
    fetch('social/fetch_latest_comments', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch,
      }),
    })
        .then(
            (res) => res.json(),
        )
        .then(
            (data) => {
              setComments(fixDates(data));
            },
        );
  };

  /**
   * Description: This function formats the dates in the comments array based on
   * the difference in time.
   * @param {object} arr
   * @return {none}
   */
  const fixDates = (arr) => {
    const today = new Date();
    for (let i = 0; i < arr.length; i++) {
      const cd = new Date(arr[i][1]);
      const timeDifference = today.getTime() - cd.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      const options =
        {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      if (dayDifference < 1) { // within one day of today
        arr[i][1] = cd.toLocaleTimeString('en-US',
            {hour: '2-digit', minute: '2-digit', hour12: true});
      } else if (dayDifference < 7) { // within one week of today
        arr[i][1] = cd.toLocaleDateString('en-US', {weekday: 'long'});
      } else { // over a week from today
        arr[i][1] = cd.toLocaleDateString('en-US', options);
      }
    }
    return arr;
  };


  /**
   * Description: This function responds to the view all button. Only five
   * comments are viewed at once so if there are more than 5, the view all
   * button didplays them. The all_comments end point is called and the
   * comments array is updated with all the comments.
   */
  const handleViewAll = () => {
    fetch('social/all_comments', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch,
      }),
    })
        .then(
            (res) => res.json(),
        )
        .then(
            (data) => {
              setComments(fixDates(data));
              setAllVisible(true);
            },
        );
  };

  /**
   * Description: This function shifts the screen's focus to the comment input.
   * It is called when the comment button is clicked.
   */
  const handleFocus = () => {
    document.getElementById('Comment Field').focus();
  };

  /**
   * Description: This function process a new comment made by the user. It calls
   * the add_comment endpoint and cheks that the
   */
  const postNewComment = () => {
    console.log('new comment');
    fetch('social/add_comment', {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      body: JSON.stringify({
        'tickr': finSearch, 'comment': newComment,
      }),
    })
        .then(
            (res) => {
              if (res.status != 200) {
                setAlertMessage('Error adding comment.');
                setAlert(true);
              } else {
                if (allVisible) {
                  handleViewAll();
                } else {
                  getComments();
                }
              }
            },
        );
  };

  return (
    <div>
      <Card>
        <Collapse in={alert}>
          <Alert severity='error'
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>}
            sx={{mb: 0, mt: 3, margin: 5}}>
            {alertMessage}
          </Alert>
        </Collapse>
        <div>
          <Button variant="contained" id="Like Button"
            sx={{'m': 2, 'ml': 2, 'width': '40%',
              'background-color': '#52658f'}}
            startIcon={liked? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={handleLike}
          >
            {numLikes}
          </Button>
          <Button variant="contained" id="Comment Button"
            onClick={handleFocus}
            sx={{'m': 2, 'mr': 2, 'width': '40%',
              'background-color': '#52658f', 'float': 'right'}}
            startIcon={<ModeCommentOutlinedIcon />}>
            {numComments}
          </Button>
        </div>
        {comments.map((item) => (
          <Paper key={item[0]} aria-label={item[0]} elevation={1}
            sx={{'m': 0, 'ml': 2, 'mr': 2,
              'align': 'center', 'text-justify': 'distribute-all-lines',
              'border-radius': '5px', 'background': '#fbfbf0'}}>
            <Typography
              sx={{'text-align': 'left', 'top': 0, 'left': 0,
                'display': 'inline', 'm': 0.5, 'font-size': '15px'}}
              style={{fontWeight: 600}}
              color={darkTheme.palette.secondary.main}>
              {item[0]}
            </Typography>
            <Typography
              sx={{'text-align': 'right', 'top': 0, 'right': 5,
                'display': 'inline', 'float': 'right',
                'font-size': '12px', 'm': 0.2}}
              color='#757575'>
              {item[1]}
            </Typography>
            <Typography sx={{'m': 0.5, 'font-size': '14px'}}>
              {item[3]}
            </Typography>
          </Paper>
        ))}
        {allVisible? null: <Button style={{fontWeight: 1000}} size="large"
          onClick={handleViewAll}
          sx={{'ml': 2, 'display': 'block',
            'm': '0 auto', 'font-size': '17px'}}
          variant="text">All Comments</Button>}
        <Input
          id="Comment Field"
          type={'text'}
          sx={{'width': '95%', 'ml': 3, 'mb': 1, 'mt': 2}}
          onChange={(event) => setNewComment(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={postNewComment}
                aria-label="toggle password visibility">
                          POST
              </Button>
            </InputAdornment>
          }/>
      </Card>
    </div>
  );
}
