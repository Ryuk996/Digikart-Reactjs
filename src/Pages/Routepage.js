import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './Prod/Prod'
import DetailProduct from './DetailProd/DetailProd'
import Login from './Login/login'
import Register from './Register'
import ActivationEmail from './activateMail';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import OrderHistory from './PurchaseHistory/PurchaseHistory'
import OrderDetails from './PurchaseHistory/OrderDetails'
import Cart from './Cart/Cart'
import NotFound from './Utils/NotFound'
import Categories from './Categories/Category'
import CreateProduct from './CreateProd/CreateProd'
import Profile from './Updateuser/updateUser'

import {PublicContext} from '../PublicContext'

function Routepage() {
    const state = useContext(PublicContext)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/forgot_pwd" component={Forgotpassword} exact={true}/>
            <Route path="/user/activate/:activation_token" component={ActivationEmail} exact={true}/>
            <Route path="/user/reset/:id" component={Resetpassword} exact={true}/>
            <Route path="/profile"  component={isLogged || isAdmin ? Profile : NotFound  }  exact={true}/>

             <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

           <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} /> 


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Routepage
