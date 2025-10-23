import React, { useContext } from 'react'
import Banner from '../components/home/Banner'
import HeroSection from '../components/home/HeroSection'
import { AppContext } from '../context/AppContext'
import { Features } from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/home/Contact'
import Footer from '../components/home/Footer'

const Home = () => {
  const {bgCol} = useContext(AppContext)
  return (
    <div className={`absolute inset-x-0 inset-y-0 overflow-y-scroll `}>
      <Banner/>
      <HeroSection/>
      <Features/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home