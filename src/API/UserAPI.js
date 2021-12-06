import {useState, useEffect} from 'react'
import axios from 'axios'
import env from '../settings'


function UserAPI(token) {

    const initialState = {
        err: '',
        success: ''
    }
    const [userZ, setUserZ] = useState(initialState)
    const { err, success} = userZ
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get(`${env.api}/user/getuser`, {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    
                    console.log(err)
                }
            }

            getUser()
            
        }
    },[token])

    
    const addCart = async (product) => {
        if(!isLogged) return ( setUserZ({...userZ, err: "Please login to continue buying", success: ''}) ,
         setTimeout( () => {
            setUserZ("")
          }, 5000) ) 
        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.put(`${env.api}/user/addcart`, {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
             setUserZ({...userZ, err: "", success: 'Product added to cart.'}) 
         setTimeout( () => {
            setUserZ("")
          }, 5000) 

        }else{
            return ( setUserZ({...userZ, err: "", success: 'This  product has been added to cart.'}) ,
         setTimeout( () => {
            setUserZ("")
          }, 5000) )
            
        }
    }

    return (
    
                            
        {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        Notification:[userZ, setUserZ]
        }
        
    )
}

export default UserAPI
