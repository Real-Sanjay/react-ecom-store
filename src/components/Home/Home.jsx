import React from 'react'
import HeroSection from './HeroSection'
import Iphone from '../../assets/iphone-14-pro.webp'
import Mac from '../../assets/mac-system-cut.jfif'
import FeaturedProduct from './FeaturedProduct'

const Home = () => {
  return (
  <>  <HeroSection title={"Buy iPhone 14pro"} desc={"One of the best phone in the market is available to buy"} img={Iphone}/>

    <FeaturedProduct/>
    <HeroSection title={"Buy Macbook pro"} desc={"One of the best laptop in the market is available to buy"} img={Mac}/></>
  )
}

export default Home