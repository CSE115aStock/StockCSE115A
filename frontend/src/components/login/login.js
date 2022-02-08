import React from "react";
import { useState } from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass:"",
            token:"",
        };
    }
    render() {
        return (
        <div className="base-container">
            <div className="header">Social Stock Analyzer</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange = {e => this.setState({username: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange = {e => this.setState({pass: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn"
                onClick={async () => {
                    fetch('/auth/login', {
                        method: 'POST',
                        body: JSON.stringify({
                          "username":this.state.username,"password":this.state.pass
                        })
                      } ).then(
                        res => res.json()
                        ).then(
                          token => {
                            console.log(this.state)
                            this.setState({token: token});
                            console.log(token)
                          }
                        )
                }}>
                    Login
                </button>
            </div>
        </div>
        );
    }
}
