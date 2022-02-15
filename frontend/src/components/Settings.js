import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
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

export default function Settings() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    const [changingButton, setChangingButton] = React.useState("Edit");
    const [changePass, setChangePass] = React.useState(false);
    const [passwordVisible, setPassVisible] = React.useState(false);
    const [currentPass, setCurrentPass] = React.useState("Current Password");
    const [newPass, setNewPass] = React.useState("New Password");
    const [repeatPass, setRepeatPass] = React.useState("Repeat Password");
    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [passAlert, setPassAlert] = React.useState(false);
    const [passAlertMessage, setPassAlertMessage] = React.useState('');

    React.useEffect(() => {
      getUserInfo();
    }, []);

    const getUserInfo = () => {
      fetch('auth/user', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
      })
      .then(
        res => res.json()
        ).then(
          data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setUsername(data.username);
            setEmail(data.email);
          }
      )
    }

    const changeButton = () => {
      // submit button pressed
      if(edit) {
          setEdit(false);
          setChangingButton("Edit");
          // make backend call to change values
          // fields cannot be empty
          if(firstName.length > 0 && lastName.length > 0 && username.length > 0) {
            fetch('/auth/settings/account', {
              method: 'PUT',
              headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
              body: JSON.stringify({
                "First Name":firstName,"Last Name":lastName,"Username":username
              })
            }).then(
              res => {
                if(res.status != 200) {
                  setAlertMessage('Error changing user information, please try again');
                  setAlert(true);
                }
                getUserInfo();
              }
              )
              .catch(err => {
                setAlertMessage('Error changing user information, please try again');
                setAlert(true);
              })
          }
          else {
            setAlertMessage('All fields must have length of one or more.');
            setAlert(true);
            getUserInfo();
          }
      }
      // edit button pressed
      else {
        setEdit(true);
        setChangingButton("Submit");
      }
    };

    // handles opening of password dialog
    const passwordChange = () => {
        if(changePass) { // dialog closed
          if(newPass === repeatPass) {
            fetch('/auth/settings/password', {
              method: 'PUT',
              headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWT')},
              body: JSON.stringify({
                "Current Password":currentPass,"New Password":newPass,"Repeat":repeatPass
              })
            } ).then(
              res => {
                  if(res.status == 200) {
                    setChangePass(false);
                    setPassVisible(false);
                  }
                  else if(res.status == 401) {
                    setPassAlertMessage('Incorrect current password.')
                    setPassAlert(true);
                  }
                  else if(res.status == 400) {
                    setPassAlertMessage('Password too weak.')
                    setPassAlert(true);
                  }
                }
              )
              .catch(err => {
                setPassAlertMessage('Error changing password, please try again')
                setPassAlert(true);
              });
          }
          else {
            setPassAlertMessage('New passwords do not match')
            setPassAlert(true);
          }
        }
        else { // dialog opened
            setChangePass(true);
        }

    };

    // cancel button to close dialog
    const cancelPass = () => {
        setChangePass(false);
        setPassVisible(false);
    };

    // changes password visibility
    const changeVisibility = () => {
        setPassVisible(!passwordVisible);
    };

    return (
      <Box
        sx={{
          display: 'flex',
          m: 0.25,
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h6" gutterBottom component="div" padding={1} color='#f50057'style={{ fontWeight: 600 }} sx={{ m: 1,}}>
            ACCOUNT DETAILS
          </Typography>
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
          <Box
          component="form"
          sx={{
          '& .MuiTextField-root': { m: 2, width: '75%' },}}
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
            <Button variant="outlined" sx={{ m: 2,}} startIcon={<EditIcon />} onClick={changeButton}>
              {changingButton}
            </Button>
            <Button variant="outlined" sx={{ m: 2,}} startIcon={<LockIcon />} onClick={passwordChange}>
              Change Password
            </Button>
            <Dialog open={changePass} onClose={cancelPass}>
              <DialogTitle>Change Password</DialogTitle>
              <Collapse in={passAlert}>
                <Alert severity='error' sx={{margin: 5}}
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
                  sx={{ mb: 0, mt: 3 }}>
                  {passAlertMessage}
                </Alert>
              </Collapse>
                <DialogContent>
                  <DialogContentText>
                    Enter the following:
                  </DialogContentText>
                  <Box>
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
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
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
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
                      Passwords must contain at least one lowercase letter, one uppercase letter, and one number
                    </FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Repeat New Password</InputLabel>
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
          </Box>
        </Paper>
      </Box>
    );
  }