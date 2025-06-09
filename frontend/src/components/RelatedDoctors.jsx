import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {


    const {doctors}=useContext(AppContext);
    const navigate=useNavigate();

    const [relDoc,setrelDoc]=useState([]);

    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData=doctors.filter((doc)=>(doc.speciality===speciality) && (doc._id!==docId));
            setrelDoc(doctorsData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-10 text-gray-800'>
        <h2 className='text-3xl font-medium'>Related Doctors</h2>
        <p className='text-center sm:w-1/3 text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='max-w-full flex flex-wrap mx-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            relDoc.slice(0,5).map((items,index)=>(
              <div onClick={()=>{navigate(`/appointment/${items._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translation-all duration-500 mx-auto'>
                <img className='bg-blue-50 w-55' src={items.image}></img>
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
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

export default RelatedDoctors