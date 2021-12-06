import React from 'react'
import { useState } from 'react'
import env from "../settings"
import "./Login/login.css";

import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'

import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'


function Resetpassword() {
    const initialState = {
        err: '',
        success: ''
    }
    const {id} = useParams()
    const [user, setUser] = useState(initialState)
    const { err, success} = user
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
            console.log({password,confirmPassword})
        try {
            let resetData = await axios.post(`${env.api}/user/resetpwd`,{password},
            {headers: {Authorization: id}})
            setUser({...user, err: '', success: resetData.data.msg})
            history.push("/login")
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
                    }}
                    >
                        <h2>Reset your password</h2>
                        <h6>enter your new password</h6>
                        <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
                        <label className="labelZ" for="floatingPassword">Password</label>
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                        <br></br>
                        <label className="labelZ" for="floatingPassword">Confirm Password</label>
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}/>
                        <br></br>
                        <div className="row">
                        <button type="submit">Reset</button>
                    
                </div>
                    </form>
               
            </div>
        </>
    )
}

export default Resetpassword
