import React from 'react'

import './HeroSection.css'

const HeroSection = ({title, desc, img}) => {
  return (
    <div className="hero_main">
        <div className="align-items hero_info">
            <h2 className='hero_title'>{title}</h2>
            <p className="hero_desc">{desc}</p>
            <button className="hero_buy_btn">Buy Now</button>
        </div>
        <a href="" className="align-items hero_link"> <img className='hero_image' src={img} alt="hero image" /></a>
    </div>
  )
}

export default HeroSection