import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './API/ProdAPI'
import UserAPI from './API/UserAPI'
import CategoriesAPI from './API/ProdCategoryAPI'


export const PublicContext = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstlogin')
        if(firstLogin!==""){
            const refreshToken = async () =>{
                const res = await firstLogin
                
                setToken(res)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <PublicContext.Provider value={state}>
            {children}
        </PublicContext.Provider>
    )
}