import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const loginBackend = () => {
        fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              "username":username,"password":password
            })
          } ).then(
            res => res.json()
            ).then(
              tk => {
                localStorage.setItem('JWT', tk);
                navigate('/homepage');
              }
            )
            .catch(err => {
                console.log(err);
                alert('Error logging in, please try again');
            });
    }
    
        return (
        <div className="base-container">
            <div className="header">Social Stock Analyzer</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
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
