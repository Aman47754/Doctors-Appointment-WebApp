import React from 'react'
import { assets } from '../assets/assets'
const Header = () => {
  return (
    <div className='flex  justify-center md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/*------------ left ------*/}
        <div className='md:w-1/2 flex flex-col   gap-4 py-10  md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight '>Book Appointment With <br/>Trusted Doctors</p>
            <div className='flex  items-center gap-3 text-white text-sm font-light '>
                <img src={assets.group_profiles} className='w-20'></img>
                <p>Simply browse through our extensive list of trusted doctors,<br/> schedule your appointment hassle-free.</p>
            </div>
            <a href='#speciality' className=' flex items-center gap-2 px-8  bg-white text-gray-700 text-sm md:m-0 py-3 rounded-full  cursor-pointer hover:scale-105 transition-all duration-200  w-53'>Book Appointment <img src={assets.arrow_icon} className='w-3 '></img></a>
        </div>
        {/*------- right -------*/}
        <div className='md:w-1/2 relative flex flex-col '>
            <img src={assets.header_img} className='w-[55.13vw] md:absolute bottom-0 rounded-lg mx-auto flex  items-center justify-center '></img>
        </div>
    </div>
  )
}

export default Header