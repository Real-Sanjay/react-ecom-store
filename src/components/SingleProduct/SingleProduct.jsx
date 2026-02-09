import React, { useState } from 'react'

import './SingleProduct.css'
import QuantityInputBtn from './QuantityInputBtn';
const product = {
        id: 1,
        title: "Product Title",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
        price: 9.99,
        images: [
            "https://placehold.net/400x400.png",
            "https://placehold.net/400x400.png",
            "https://placehold.net/400x400.png",
            "https://placehold.net/400x400.png",
        ],
        stock: 10,
    };
const SingleProduct = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <section className="align-items single_product_page">
        <div className="align-items product_thumbnail">
            {
                product.images.map((img, i) => <img className={currentIndex === i ? 'selected_thumbnail' : ''} src={img} alt={product.title} onClick={() => setCurrentIndex(i)}/>)
            }
        </div>

        <div className="selected_image">
            <img src={product.images[currentIndex]} alt={product.title} />
        </div>

        <div className="product_details">
            <h2 className='product_title'>{product.title}</h2>
            <p className="product_description">{product.description}</p>
            <p className="product_price">${product.price.toFixed(2)}</p>
            <h2 className='product_quantitiy'>Quantity:</h2>
             <QuantityInputBtn/>
            <button className="add_cart">Add to Cart</button>
        </div>
    </section>
  )
}

export default SingleProduct