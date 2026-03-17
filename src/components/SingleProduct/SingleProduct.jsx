import React, { memo, useContext, useState } from 'react'
import { useParams } from "react-router-dom";

import './SingleProduct.css'
import QuantityInputBtn from './QuantityInputBtn';
import useData from "../../hooks/useData";
import Loader from './../Shared/Loader';
import cartContext from '../../context/cartContext';
import userContext from '../../context/userContext';

const SingleProduct = () => {
    const [quantity, setquantity] = useState(1);
    const {id} = useParams();
    const {data, error, isloading} = useData(`/products/${id}`, "product");
    const {addToCart} = useContext(cartContext);
    const user = useContext(userContext);

    const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <section className="align-items single_product_page">
        {error && <p className='error' style={{color: 'red'}}  >Error: {error}</p>}
        {isloading && <Loader/>}
        {(!isloading && data  ) && (<><div className="align-items product_thumbnail">
            {
                data?.images.map((img, i) => <img key={i} className={currentIndex === i ? 'selected_thumbnail' : ''} src={`https://cartwish-backend-rjnx.onrender.com/products/${img}`} alt={data?.title} onClick={() => setCurrentIndex(i)}/>)
            }
        </div>

        <div className="selected_image">
            <img src={`https://cartwish-backend-rjnx.onrender.com/products/${data?.images[currentIndex]}`} alt={data?.images[currentIndex]} />
        </div>

        <div className="product_details">
            <h2 className='product_title'>{data?.title}</h2>
            <p className="product_description">{data?.description}</p>
            <p className="product_price">${data?.price.toFixed(2)}</p>
            <h2 className='product_quantitiy'>Quantity:</h2>
             <QuantityInputBtn quantity={quantity} setquantity={setquantity} stock={data?.stock}/>
            {user && <button className="add_cart" onClick={() => addToCart(data, quantity)}>Add to Cart</button>}
        </div></>)}
    </section>
  )
}

export default memo(SingleProduct)