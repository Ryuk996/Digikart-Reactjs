import { Close } from '@material-ui/icons'
import {useState} from 'react'
import './notification.css'


export const showErrMsg = (msg) => {

  
    return <div>
            <div className="errMsg">{msg}</div>
        </div>
}

export const showSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}</div>
}