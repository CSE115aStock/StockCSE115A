import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

/**
 *
 * @return {Object} JSX
 */
export function Register() {
  const [username, setUsername] = React.useState('');
  const [pass, setPassword] = React.useState('');
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [verify, setVerify] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const navigate = useNavigate();

  const registerBackend = () => {
    if (verify == pass) {
      fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          'first_name': fName,
          'last_name': lName,
          'email': email,
          'username': username,
          'password': pass,
          'verify_password': verify,
        }),
      } ).then( (res) => res.json(),
      ).then(
          (tk) => {
            if (tk.err_msg === 'Account creation successful') {
              navigate('/');
            } else {
              setAlertMessage(tk.err_msg);
              setAlert(true);
            }
          },
      ).
          catch((err) => {
            setAlertMessage(err);
            setAlert(true);
          });
    } else {
      setAlertMessage('The passwords do not match!');
      setAlert(true);
    }
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
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{mb: 0, mt: 3}}
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
            <label htmlFor="f_name">First name</label>
            <input type="text" name="first name" placeholder="first name"
              onChange={(event) => setFName(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="l_name">Last name</label>
            <input type="text" name="last name" placeholder="last name"
              onChange={(event) => setLName(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email"
              onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password"
              onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="verify_password">Verify Password</label>
            <input type="password" name="v_password"
              placeholder="verify password"
              onChange={(event) => setVerify(event.target.value)}/>
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to='/'>
          <button className='btn'>Log In</button>
        </Link>
        <button type="button" className="btn"
          onClick={registerBackend}>
                    Register
        </button>
      </div>
    </div>
  );
}
