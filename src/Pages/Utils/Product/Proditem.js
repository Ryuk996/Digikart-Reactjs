import React, { useState } from 'react'
import Starrating from '../../../Components/StarRating/Starrating'
import BtnRender from './BtnRender'
import './Proditem.css'

function Proditem({product, isAdmin, deleteProduct, handleCheck}) {

    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        setRating(rate)
      }
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <Starrating></Starrating>
                <p>{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default Proditem