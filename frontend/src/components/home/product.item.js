import React from 'react'
import { Link } from 'react-router-dom'
const ProductItem = ({ urlImg, price, name, id, book }) => (
    <div className="col-sm-4">
        <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center"
                >
                    {console.log(urlImg)}
                    <Link to={'/product/' + id}><img src={urlImg} alt="" /></Link>
                    <Link to={'/product/' + id}><h4 className='name-product'>{name}</h4></Link>
                    <div className='product-content'>
                        <h2>Giá:</h2>
                        <Link to={'/product/' + id}><h2>{new Intl.NumberFormat('de-DE', { currency: 'EUR' }).format(price)}<sup>đ</sup></h2></Link>
                    </div>



                </div>
            </div>
        </div>
    </div>
)
export default ProductItem