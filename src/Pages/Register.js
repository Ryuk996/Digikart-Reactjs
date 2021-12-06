// import "../App.css";
import "./Login/login.css";
import React ,{useState} from "react";
import axios from "axios";
import { useHistory} from "react-router-dom";
import env from "../settings"
import {Link} from "react-router-dom"
import {showErrMsg,showSuccessMsg} from "../Notifications/Notification"
// import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUser({...user, err: "Password did not match.", success: ''})
            
        try {
            let registerData = await axios.post(`${env.api}/user/register`,{firstName,lastName,userName,password})
            setUser({...user, err: '', success: registerData.data.msg})
            
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
                <h2>Register</h2>

                <label className="labelZ" for="floatingInput">First Name</label>
                <input type="text" class="form-control" id="floatingInput"  placeholder="FirstName" value={firstName} onChange={e =>setFirstname(e.target.value)} />
                
                <label className="labelZ" for="floatingInput">Last Name</label>
                <input type="text" class="form-control" id="floatingInput"  placeholder="LastName" value={lastName} onChange={e =>setLastname(e.target.value)} />
                    
                <label className="labelZ" for="floatingInput">Email address</label>
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                
                <label className="labelZ" for="floatingPassword">Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                
                <label className="labelZ" for="floatingPassword">Confirm Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}/>
                    

                <div className="row">
                    <button type="submit">Register</button>
                    {/* <Link to="/forgot_pwd">Forgot Password</Link> */}
                </div>
            </form>
            {err&& showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                <span class=" text-white">Already have Account ?</span><Link to="/login" className="register">Login</Link>
        </div>
</>
    )
}

export default Register
