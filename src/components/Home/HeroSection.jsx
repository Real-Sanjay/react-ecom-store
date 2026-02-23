import React from 'react'

import './HeroSection.css'
import { Link } from 'react-router-dom'

const HeroSection = ({title, desc, img, link}) => {
  return (
    <div className="hero_main">
        <div className="align-items hero_info">
            <h2 className='hero_title'>{title}</h2>
            <p className="hero_desc">{desc}</p>
           <Link to={link}><button  className="hero_buy_btn">Buy Now</button></Link> 
        </div>
        <Link to={link} className="align-items hero_link"> <img className='hero_image' src={img} alt="hero image" /></Link>
    </div>
  )
}

export default HeroSection