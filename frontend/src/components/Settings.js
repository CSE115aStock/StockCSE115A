import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
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
export default function Settings() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [changingButton, setChangingButton] = React.useState('Edit');
  const [changePass, setChangePass] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState('Confirm Delete');
  const [deleteAcc, setDeleteAcc] = React.useState(false);
  const [passwordVisible, setPassVisible] = React.useState(false);
  const [currentPass, setCurrentPass] = React.useState('Current Password');
  const [newPass, setNewPass] = React.useState('New Password');
  const [repeatPass, setRepeatPass] = React.useState('Repeat Password');
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [passAlert, setPassAlert] = React.useState(false);
  const [passAlertMessage, setPassAlertMessage] = React.useState('');
  const navigate = useNavigate();


  /**
   * Description: Updates the user info variables. Updates with render.
   */
  React.useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * Description: Pulls user info using auth/user backend.
   * Stores the information in seperate variables.
   */
  const getUserInfo = () => {
    fetch('auth/user', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
    })
        .then(
            (res) => res.json(),
        ).then(
            (data) => {
              setFirstName(data.first_name);
              setLastName(data.last_name);
              setUsername(data.username);
              setEmail(data.email);
            },
        );
  };

  /**
   * Description: Handles button under user info's changes.
   * Button enables textboxes or submits user info.
   * Button switches to submit if edit is pressed.
   * Button switches to edit if submit is pressed.
   * Makes back end call to change user information.
   */
  const changeButton = () => {
    // submit button pressed so button becomes edit
    if (edit) {
      setEdit(false);
      setChangingButton('Edit');
      // make backend call to change values
      // fields cannot be empty
      if (firstName.length > 0 && lastName.length > 0 &&
        username.length > 0) {
        fetch('/auth/settings/account', {
          method: 'PUT',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
          body: JSON.stringify({
            'First Name': firstName, 'Last Name': lastName,
            'Username': username,
          }),
        }).then(
            (res) => {
              if (res.status != 200) {
                setAlertMessage('Error changing user information, ',
                    'please try again');
                setAlert(true);
              }
              getUserInfo();
            },
        )
            .catch((err) => {
              setAlertMessage('Error changing user information, ',
                  'please try again');
              setAlert(true);
            });
      // else, fields are empty
      } else {
        setAlertMessage('All fields must have length of one or more.');
        setAlert(true);
        getUserInfo();
      }
    // if submit button is pressed, it is changed to edit.
    } else {
      setEdit(true);
      setChangingButton('Submit');
    }
  };

  /**
   * Description: Handles when the change password button or the
   * submit button is pressed. If the change password button is pressed,
   * it pulls up the dialog. If submit is pressed, a back end call is
   * made to update the password. The dialog is also closed.
   */
  const passwordChange = () => {
    if (changePass) { // dialog currently open and is being closed
      if (newPass === repeatPass) {
        fetch('/auth/settings/password', {
          method: 'PUT',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
          body: JSON.stringify({
            'Current Password': currentPass, 'New Password': newPass,
            'Repeat': repeatPass,
          }),
        } ).then(
            (res) => {
              if (res.status == 200) {
                setChangePass(false);
                setPassVisible(false);
              } else if (res.status == 401) {
                setPassAlertMessage('Incorrect current password.');
                setPassAlert(true);
              } else if (res.status == 400) {
                setPassAlertMessage('Password too weak.');
                setPassAlert(true);
              }
            },
        )
            .catch((err) => {
              setPassAlertMessage('Error changing password, please try again');
              setPassAlert(true);
            });
      } else {
        setPassAlertMessage('New passwords do not match');
        setPassAlert(true);
      }
    } else { // dialog is currently closed and being opened
      setChangePass(true);
    }
  };

  /**
   * Description: Handles when the cancel button is pressed on
   * the dialog. It closes the dialog and sets the visibility
   * to off.
   */
  const cancelPass = () => {
    setChangePass(false);
    setPassVisible(false);
  };

  /**
   * Description: Handles when the visibility change button in
   * the password field is pressed. Reverses the current setting.
   */
  const changeVisibility = () => {
    setPassVisible(!passwordVisible);
  };


  /**
 * Description: Handles when the delete account button or the
 * If the delete account button is pressed,
 * it pulls up the dialog. If confirm is pressed, a back end call is
 * delete the account and it's comments and likes.
 * The dialog is also closed.
 */
  const deleteAccount = () => {
    if (deleteAcc) {
      if (confirmDelete == 'DELETE') {
        fetch('/auth/settings/account/delete', {
          method: 'DELETE',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
        }).then(
            (res) => {
              if (res.status == 200) {
                setDeleteAcc(false);
                localStorage.clear();
                navigate('/');
              }
            },
        );
      } else {
        setPassAlertMessage('Text entered doesn not match DELETE');
        setPassAlert(true);
      }
    } else {
      setDeleteAcc(true);
    }
  };


  /**
   * Description: Handles when the cancel button is pressed on
   * the dialog. It closes the dialog and sets the visibility
   * to off.
   */
  const cancelDelete = () => {
    setDeleteAcc(false);
  };

  return (
    <Box
      sx={{
        'display': 'flex',
        'm': 0.25,
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
            ACCOUNT DETAILS
        </Typography>
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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {m: 2, width: '75%'}}}
          noValidate
          autoComplete="off">
          <div>
            <TextField
              disabled={!edit}
              id="standard-disabled"
              label="First Name"
              value={firstName}
              variant="filled"
              onChange={(event) => setFirstName(event.target.value)}/>
            <TextField
              disabled={!edit}
              id="standard-disabled"
              label="Last Name"
              value={lastName}
              variant="filled"
              onChange={(event) => setLastName(event.target.value)}/>
            <TextField
              disabled
              id="standard-disabled"
              label="Email"
              value={email}
              variant="filled"
              onChange={(event) => setEmail(event.target.value)}/>
            <TextField
              disabled={!edit}
              id="standard-disabled"
              label="Username"
              value={username}
              variant="filled"
              onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <Button variant="contained" sx={{m: 2}}
            startIcon={<EditIcon />} onClick={changeButton}>
            {changingButton}
          </Button>
          <Button variant="contained" sx={{m: 2}}
            startIcon={<LockIcon />} onClick={passwordChange}>
              Change Password
          </Button>
          <Button variant="contained" sx={{m: 2, backgroundColor: 'red'}}
            startIcon={<DeleteIcon />} onClick={deleteAccount}>
              Delete Account
          </Button>
          <Dialog open={changePass} onClose={cancelPass}>
            <DialogTitle>Change Password</DialogTitle>
            <Collapse in={passAlert}>
              <Alert severity='error'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setPassAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{mb: 0, mt: 3, margin: 5}}>
                {passAlertMessage}
              </Alert>
            </Collapse>
            <DialogContent>
              <DialogContentText>
                    Enter the following:
              </DialogContentText>
              <Box>
                <FormControl sx={{m: 1, width: '50ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                      Current Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={passwordVisible ? 'text' : 'password'}
                    onChange={(event) => setCurrentPass(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={changeVisibility}>
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{m: 1, width: '50ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    New Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={passwordVisible ? 'text' : 'password'}
                    onChange={(event) => setNewPass(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={changeVisibility}>
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }/>
                  <FormHelperText id="standard-weight-helper-text">
                      Passwords must be at least eight characters in length.
                      Passwords must contain at least one lowercase letter,
                      one uppercase letter, and one number
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, width: '50ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Repeat New Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={passwordVisible ? 'text' : 'password'}
                    onChange={(event) => setRepeatPass(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={changeVisibility}>
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }/>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelPass}>Cancel</Button>
              <Button onClick={passwordChange}>Submit</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={deleteAcc} onClose={cancelDelete}>
            <DialogTitle>Delete Account</DialogTitle>
            <Collapse in={passAlert}>
              <Alert severity='error'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setPassAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{mb: 0, mt: 3, margin: 5}}>
                {passAlertMessage}
              </Alert>
            </Collapse>
            <DialogContent>
              <Box>
                <FormControl sx={{m: 1, width: '50ch'}} variant="standard">
                  <InputLabel>
                      Type DELETE to confirm account deletion
                  </InputLabel>
                  <Input
                    onChange={(event) => setConfirmDelete(event.target.value)}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete}>Cancel</Button>
              <Button onClick={deleteAccount}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}
