import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const [username,setUsername] = useState([]);
        const [pass,setPassword] = useState([]);
        const [fName,setFName] = useState([]);
        const [lName,setlName] = useState([]);
        const [email,setemail] = useState([]);
        const [verify_password,setVerify_password] = useState([]);
        return (
        <div className="base-container">
            <div className="header">Social Stock Analyzer</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange = {e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="f_name">First name</label>
                        <input type="text" name="first name" placeholder="first name" onChange = {e => setFName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="l_name">Last name</label>
                        <input type="text" name="last name" placeholder="last name" onChange = {e => setlName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email" onChange = {e => setemail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange = {e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="verify_password">Verify Password</label>
                        <input type="password" name="v_password" placeholder="verify password" onChange = {e => setVerify_password(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn"
                onClick={async () => {
                  if (verify_password == pass) {
                    fetch('/auth/signup', {
                      method: 'POST',
                      body: JSON.stringify({
                        f_name = fName,
                        l_name =lName,
                        email = email,
                        username = username,
                        p_word = pass,
                        verify_p_word = verify_password,
                      })
                    } ).then(
                      res => res.json()
                      ).then(
                        token => {
                          setToken(token);
                          console.log(token)
                        }
                      )
                   }}}>
                    Register
                </button>
            </div>
        </div>
        );
    }
}
