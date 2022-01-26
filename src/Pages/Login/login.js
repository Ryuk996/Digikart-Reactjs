import React from 'react'
import {useState} from 'react'
import env from "../../settings"
import "./login.css";
// import "./App.css";
import axios from 'axios';
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"
import {showErrMsg,showSuccessMsg} from "../../Notifications/Notification"
import { Email, LockOpen } from '@material-ui/icons';


// import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    let history = useHistory()

    let handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginData= await axios.post(`${env.api}/user/login`,{userName,password})
            window.localStorage.setItem("firstlogin",loginData.data.aToken)
            window.localStorage.setItem("userToken",loginData.data.uToken)
            
            
            window.location.href = "/";
        } catch (err) {
 
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''}) 
        }
        
        
    }
    return (
        <>
       <div className="login-page">
            <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                <h2>Login</h2>
                <label className="labelZ" for="floatingInput">Email address</label>
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                
                <label className="labelZ" for="floatingPassword">Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                

                {/* <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} /> */}

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_pwd">Forgot Password</Link>
                </div>
            </form>
            {err&& showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                <div className="credential">                                                   
                        <h6>Demo credential</h6>
                        <h6><Email className="credicon"/>: sasuke@thail.com</h6>
                        <h6><LockOpen className="credicon"/>: 12345678</h6>
                    </div>
                <span className="text-white">New user ?</span><Link to="/register" className="register">Register</Link>
        </div>
    </>
    )
}

export default Login
