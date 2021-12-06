import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {PublicContext} from '../../PublicContext'
import ProductItem from '../Utils/Product/Proditem'


function DetailProd() {
    const params = useParams()
    const state = useContext(PublicContext)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <div class='some-page-wrapper'>
                                <div class='rowz'>
                                    <div class='columnz'>
                                    <div class='blue-column'>
                                        {/* Some Text in Column One */}
                                        <p className="pricez">Price</p>
                                    <p className="pricez">Description</p>
                                    <p className="pricez">Specification</p>
                                    <p className="pricez">Sold: {detailProduct.sold}</p>
                                    </div>
                                    
                                    </div>
                                    <div class='columnz'>
                                    <div class='green-column'>
                                        {/* Some Text in Column Two */}
                                        <p className="dz">$ {detailProduct.price}</p>
                                        <p className="dz">{detailProduct.description}</p>
                                        <p className="dz">{detailProduct.content}</p>
                                    </div>
                                    
                                    </div>
                                </div>
                                </div>
                                
                                <div className="detailMob">
                                    <p className="detailLeft">Price</p>
                                <span className="prz">$ {detailProduct.price}</span>
                                <p className="detailLeft" >Description</p>
                    <p className="dz">{detailProduct.description}</p>
                    <p className="detailLeft">Specification</p>
                    <p className="dz">{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                                </div>
                    
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProd
