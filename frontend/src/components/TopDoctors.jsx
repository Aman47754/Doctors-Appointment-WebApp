import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';

const TopDoctors = () => {
  const navigate= useNavigate();
  const {doctors}= useContext(AppContext);

  return (
    <div className='flex flex-col items-center justify-center gap-4 py-16 text-gray-800'>
        <h2 className='text-3xl font-medium'>Top Doctors to Book</h2>
        <p className='text-center sm:w-1/3 text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full flex flex-wrap mx-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            doctors.slice(0,10).map((items,index)=>(
              <div onClick={()=>{navigate(`/appointment/${items._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translation-all duration-500 mx-auto'>
                <img className='bg-blue-50 w-55' src={items.image}></img>
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${items.available ?'text-green-500':'text-gray-500'}`}>
                    <p className={`w-2 h-2 ${items.available ?'bg-green-500':'bg-gray-500'}  rounded-full`}></p><p>{items.available ?'Available':'Not Available'}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{items.name}</p>
                    <p className='text-gray-600 text-sm'>{items.speciality}</p>
                </div>
                

              </div>
            ))
          }
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>

    </div>
  )
}

export default TopDoctors