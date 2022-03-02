import React from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

/**
 *
 * @return {Object} JSX
 */
export function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const loginBackend = () => {
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        'username': username, 'password': password,
      }),
    } ).then(
        (res) => res.json(),
    ).then(
        (tk) => {
          if (typeof tk.err_msg == 'undefined') {
            localStorage.setItem('JWT', tk);
            navigate('/homepage');
          } else {
            setAlertMessage(tk.err_msg);
            setAlert(true);
          }
        },
    )
        .catch((err) => {
          setAlertMessage('Error logging in, please try again');
          setAlert(true);
        });
  };

  const closeError = () => {
    setAlert(false);
    setAlertMessage('');
  };

  return (
    <div className="base-container">
      <div className="header">Social Stock Analyzer</div>
      <Collapse in={alert}>
        <Alert severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closeError;
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
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username"
              onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password"
              onChange={(event) => setPassword(event.target.value)}/>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn"
          onClick={loginBackend}>
                    Login
        </button>
        <Link to='/register'>
          <button className='btn'>Create new account</button>
        </Link>
      </div>
    </div>
  );
}
