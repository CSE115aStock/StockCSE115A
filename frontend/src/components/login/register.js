import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className="base-container">
            <div className="header">Social Stock Analyzer</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="f_name">First name</label>
                        <input type="text" name="first name" placeholder="first name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="l_name">Last name</label>
                        <input type="text" name="last name" placeholder="last name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Register
                </button>
            </div>
        </div>
        );
    }
}
