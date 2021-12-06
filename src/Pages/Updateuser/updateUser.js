import React, { useEffect, useRef, useState } from "react"
import axios from "axios";
import { useHistory } from "react-router";
import env from "../../settings"
import "../Login/login.css"
import {showErrMsg, showSuccessMsg} from '../../Notifications/Notification'
// import { useSelector } from "react-redux";
// import { AddAPhoto, Camera, CameraFront, Home } from "@material-ui/icons";
// import { db,storage } from "../../lib/firebase/firebase";
// import { addDoc,collection, serverTimestamp } from "@firebase/firestore";
// import { getDownloadURL, ref, uploadString  } from "@firebase/storage";
import { Link } from "react-router-dom";
export default function UpdateUser(){

    const token = window.localStorage.getItem("firstlogin");
    const initialState = {
        err: '',
        success: ''
    }
    const [userZ, setUserZ] = useState(initialState)
    const { err, success} = userZ
    const [firstName, setFirstName]=useState(" ");
    const [userName, setUsername]=useState(" ");
    const [profilePic, setProfilePic]=useState(" ");
    const [password, setPassword] = useState("");
    const [role, setRole]=useState(" ");
     const [confirmPassword, setConfirmpassword] = useState("");
    const[isLoading,setLoading]=useState(false)
    const filePickerRef = useRef(null);
     const[selectedFile,setSelectedFile] = useState(null)
    const history = useHistory();
    // const auth = useSelector(state => state.auth)
    // const {user, alluser} = auth
    // console.log(user)
    
    // let  name = user.map((item) => item.firstName)
    // let  username = user.map((item) => item.userName)
    // let DP = user.map((item)=>item.profilePic)
    // console.log(name)
    useEffect(async()=>{
      try{
        let product = await axios.get(`${env.api}/user/getuserInfo`, {
                        headers: {Authorization: token}
                    })
      setUsername(product.data.userName)             
      setFirstName(product.data.firstName)
      setProfilePic(product.data.profilePic)
      setRole(product.data.role)
      console.log([product.data])
      }
      catch{
        console.log("error");
      }
    },[])

   

    const updateInfor = () => {
        try {
             axios.put(`${env.api}/user/updateuser`, {
                firstName: firstName ? firstName : firstName,
                // profilePic: profilePic ? profilePic : profilePic,
                role: role ? role : role,
            },{
                headers: {Authorization: token}
            })

            setUserZ({...userZ, err: '' , success: "Updated Success!"})
        } catch (err) {
            setUserZ({...userZ, err: err.response.data.msg , success: ''})
        }
    }
    const updatePassword = async () => {
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUserZ({...userZ, err: "Password did not match.", success: ''})
            console.log({password,confirmPassword})
        try {
            let resetData = await axios.post(`${env.api}/user/resetpwd`,{password},
            {headers: {Authorization: token}})
            setUserZ({...userZ, err: '', success: resetData.data.msg})
        } catch (err) {
            err.response.data.msg &&
            setUserZ({...userZ, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = () => {
        if(firstName || role ) updateInfor()
        if(password) updatePassword()
    }

    return(
        <>
      {/* <div className="container"> */}
      <div className="login-page">
        <h2>Update Profile</h2>
      
      <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
                         
                 <form>
                <label className="labelZ" for="floatingInput">First Name</label>
                <input type="text" class="form-control" id="floatingInput"  placeholder="FirstName" value={firstName} onChange={e =>setFirstName(e.target.value)} />

                <label className="labelZ" for="floatingInput">Role</label>
                <input type="text" class="form-control" id="floatingInput"  placeholder="Admin or User" value={role} onChange={(e) => {setRole(e.target.value)}} />
                <p className="upz">*to change role"(Admin=1 and User=0)"</p>
                <div>
                <label className="labelZ" for="floatingInput">Email address</label>
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName}  disabled />
                </div>
                <label className="labelZ" for="floatingPassword">Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                
                <label className="labelZ" for="floatingPassword">Confirm Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}/>
                </form>
                <button className="update" onClick={handleUpdate}>Update</button> 
      </div>
    {/* </div>  */}
    </>
    // </div>
    )
}


