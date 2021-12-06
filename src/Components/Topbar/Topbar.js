import React, {useContext, useState} from 'react'
import {PublicContext} from '../../PublicContext'

import { Close, Menu, MenuOpenSharp, ShoppingCart } from '@material-ui/icons'

import {Link} from 'react-router-dom'
import axios from 'axios'
import env from '../../settings'


function Topbar() {
    const state = useContext(PublicContext)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get(`${env.api}/user/logout`)
        
        window.localStorage.removeItem('firstlogin')
        window.localStorage.removeItem('userToken')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <div className="header" >
            <div className="menu" onClick={() => setMenu(!menu)}>
                <Menu></Menu>
                {/* <img src={Menu} alt="" width="30" /> */}
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'DiGi Kart'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }

                <li  onClick={() => setMenu(!menu)}>
                    <div className="menu">
                    <Close ></Close>
                    </div>
                    {/* <img src={Close} alt="" width="30" className="menu" /> */}
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <ShoppingCart width="30"></ShoppingCart>
                        {/* <img src={ShoppingCart} alt="" width="30" /> */}
                    </Link>
                </div>
            }
            
        </div>
    )
}

export default Topbar
