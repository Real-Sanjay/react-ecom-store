import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import './SingleProduct.css'
import QuantityInputBtn from './QuantityInputBtn';
import useData from "../../hooks/useData";
import Loader from './../Shared/Loader';

const SingleProduct = () => {
    const [count, setcount] = useState(1);
    const {id} = useParams();
    const {data, error, isloading} = useData(`/products/${id}`);



    const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <section className="align-items single_product_page">
        {error && <p className='error' style={{color: 'red'}}  >Error: {error}</p>}
        {isloading && <Loader/>}
        {(!isloading && data  ) && (<><div className="align-items product_thumbnail">
            {
                data?.images.map((img, i) => <img className={currentIndex === i ? 'selected_thumbnail' : ''} src={`http://localhost:5000/products/${img}`} alt={data?.title} onClick={() => setCurrentIndex(i)}/>)
            }
        </div>

        <div className="selected_image">
            <img src={`http://localhost:5000/products/${data?.images[currentIndex]}`} alt={data?.images[currentIndex]} />
        </div>

        <div className="product_details">
            <h2 className='product_title'>{data?.title}</h2>
            <p className="product_description">{data?.description}</p>
            <p className="product_price">${data?.price.toFixed(2)}</p>
            <h2 className='product_quantitiy'>Quantity:</h2>
             <QuantityInputBtn count={count} setCount={setcount} stock={data?.stock}/>
            <button className="add_cart">Add to Cart</button>
        </div></>)}
    </section>
  )
}

export default SingleProduct