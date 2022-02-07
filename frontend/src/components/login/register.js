import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass:"",
            fName:"",
            lname:"",
            email:"",
            verify_password:"",
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
                        <label htmlFor="f_name">First name</label>
                        <input type="text" name="first name" placeholder="first name" onChange = {e => this.setState({fName: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="l_name">Last name</label>
                        <input type="text" name="last name" placeholder="last name" onChange = {e => this.setState({lname: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email" onChange = {e => this.setState({email: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange = {e => this.setState({pass: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="verify_password">Verify Password</label>
                        <input type="password" name="v_password" placeholder="verify password" onChange = {e => this.setState({verify_password: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn"
                onClick={async () => {
                  if (this.verify_password == this.pass) {
                    fetch('/auth/signup', {
                      method: 'POST',
                      body: JSON.stringify({
                        "first_name": this.state.fName,
                        "last_name":this.state.lname,
                        "email": this.state.email,
                        "username": this.state.username,
                        "password": this.state.pass,
                        "verify_password": this.state.verify_password
                      })
                    } )
                   }
                   console.log(this.state)
                   }}>
                    Register
                </button>
            </div>
        </div>
        );
    }
}
