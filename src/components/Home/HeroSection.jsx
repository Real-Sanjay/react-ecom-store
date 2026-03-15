import React from 'react'
import { motion } from 'motion/react'
import './HeroSection.css'
import { Link } from 'react-router-dom'

const HeroSection = ({title, desc, img, link}) => {
  return (
    <div className="hero_main">
        <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInout"}} viewport={{once: true} } className="align-items hero_info">
            <h2 className='hero_title'>{title}</h2>
            <p className="hero_desc">{desc}</p>
           <Link to={link}><button  className="hero_buy_btn">Buy Now</button></Link> 
        </motion.div>
        <motion.div className="align-items hero_link" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInout"}} viewport={{once: true}}>
          <Link to={link} > <img className='hero_image' src={img} alt="hero image" /></Link>
          </motion.div>
    </div>
  )
}

export default HeroSection