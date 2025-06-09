import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext);

    const logout=()=>{
        setToken(false);
        localStorage.removeItem('token')
    }

  return (
    <div className='flex justify-between  items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img  src={assets.logo} className='w-44 cursor-pointer'></img>
        <ul className='hidden md:flex items-start font-medium gap-5 '>
            <NavLink to='/' >
            {({isActive})=>(
                <div>
                    <li className='hover:text-gray-500'>HOME</li>
                    {isActive && <hr className='bg-primary h-0.5 w-3/5 m-auto border-none outline-none '/>}
                </div>
                

            )}
                
                
            </NavLink>
            <NavLink to='/doctors'>
                {({isActive})=>(
                <div>
                    <li className='hover:text-gray-500'>ALL DOCTORS</li>
                    {isActive && <hr className='bg-primary h-0.5 w-3/5 m-auto border-none outline-none '/>}
                </div>
                

            )}
            </NavLink>
            <NavLink to='/about'>
                {({isActive})=>(
                <div>
                    <li className='hover:text-gray-500'>ABOUT</li>
                    {isActive && <hr className='bg-primary h-0.5 w-3/5 m-auto border-none outline-none '/>}
                </div>
                

            )}
            </NavLink>
            <NavLink to='/contact'>
                {({isActive})=>(
                <div>
                    <li className='hover:text-gray-500'>CONTACT</li>
                    {isActive && <hr className='bg-primary h-0.5 w-3/5 m-auto border-none outline-none '/>}
                </div>
                

            )}
            </NavLink>
        </ul>
        <div className='flex gap-2'>
        {
            token && userData?
            <div className='flex gap-1 cursor-pointer group relative'>
                <img src={userData.image} className='w-10 rounded-full '></img>
                <img src={assets.dropdown_icon} className='w-2.5'></img>
                <div className='absolute top-0 right-0 pt-15 text-base text-gray-600 z-20 font-medium hidden group-hover:block '>
                    <div className='min-w-48 bg-stone-100 flex flex-col gap-4 p-4 rounded-lg '>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black'>Logout</p>
                    </div>
                </div>
                
            </div>
            :
            <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>Create Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} />
        {/* mobile menu */}
        <div className={` ${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-500`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' src={assets.logo} ></img>
                <img className='w-7 cursor-pointer' onClick={()=>setShowMenu(false)} src={assets.cross_icon} ></img>
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink  onClick={()=>setShowMenu(false)} to={'/'}><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to={'/doctors'}><p className='px-4 py-2 rounded inline-block'>All Dotors</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to={'/about'}><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to={'/contact'}><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
            </ul>
        </div>
        </div>
        
    </div>
  )
}

export default Navbar