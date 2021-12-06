import {useState, useEffect} from 'react'
import axios from 'axios'
import env from '../settings'

function ProdCategoryAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get(`${env.api}/api/category`)
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    return (
        {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
        }
    )
}

export default ProdCategoryAPI
