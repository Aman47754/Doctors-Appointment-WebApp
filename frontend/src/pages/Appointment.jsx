import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppContext} from '../contexts/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const {docId}=useParams();
    const {doctors,backendUrl,token,getDoctorsData}=useContext(AppContext);
    const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

    const navigate=useNavigate();

    const [docInfo,setDocInfo]=useState(null);

    const [docSlots,setDocSlots]=useState([]);
    const [slotIndex,setSlotIndex]=useState(0);//by default index is 0 means the curret time will be selected automatically
    const [slotTime,setSlotTime]=useState('');


    const fetchDocInfo=async ()=>{
      const docInfo= doctors.find(doc=>doc._id===docId);
      setDocInfo(docInfo);
      console.log(docInfo);
    }

    const getAvailableSlots=async()=>{
      setDocSlots([]);

      //getting current date
      let today=new Date();

      //getting next 7 days from today including today
      for(let i=0;i<7;i++){

        //getting date with index
        let currentDate=new Date(today);
        currentDate.setDate(today.getDate()+i);

        //setting end time of the date with index
        let endTime= new Date();
        endTime.setDate(today.getDate()+i)
        endTime.setHours(21,0,30,0);//9:30 PM clock


        //setting hours
        if(today.getDate() === currentDate.getDate()){
          //then we will set the hours from the current time
          currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1:10);
          //above line means if the current time is more than 10Am then the time slots will start from the currrent time +1 hiurs else
          //if the timing now is less then 10Am the time slots will show from 10 Am morning

          currentDate.setMinutes(currentDate.getMinutes()>30 ? 30:0)
        }
        else{
          //if the selected slot date is not current date i.e., we are booking for future date
          //then there time slots will start from 10 am morning
          currentDate.setHours(10)
          currentDate.setMinutes(0);
        }

        let timeSlots=[];
        while(currentDate< endTime){
          //create time slots in every 30 min
          let formattedTime= currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
          
          //here we can also implement a feature that when a slot is booked then it will not show in the ui
          //for this we have to fetch booked date and time
          //add time slots to array
          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          })
          //increment curr time by 30 min
          currentDate.setMinutes(currentDate.getMinutes()+30);
        }
        setDocSlots(prev=>([...prev, timeSlots]))

      }

    }

    const bookAppointment= async()=>{
      if(!token){
        toast.warn('Login to book appointment')
        return navigate('/login')
      }
      try {
        const date=docSlots[slotIndex][0].datetime;

        let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

        
        const {data}= await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
        console.log(data);
        if(data.success){
          toast.success(data.message);
          getDoctorsData();
          navigate('/my-appointments')
        }else{
          console.log("here")
          toast.error(data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    

    useEffect(()=>{
      fetchDocInfo();
      
    },[doctors,docId])

    useEffect(()=>{
      getAvailableSlots();
    },[docInfo])

    useEffect(()=>{
      console.log(docSlots);
    },[docSlots])

    


  return docInfo &&(
    <div>
        {/* doctors div */}
        <div className='flex flex-col sm:flex-row gap-4 '>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docInfo.image}></img>
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* name,degree exp */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon}/>
            </p>

            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>

            {/* about doctor */}
            <div className=''>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon}></img></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>${docInfo.fees}</span></p>
            
          </div>
          
        </div>
        {/* Booking Slots */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots.map((item,index)=>(
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index? 'bg-primary text-white':' border border-gray-500'} `} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()] }</p>
                  <p>{item[0] && item[0].datetime.getDate()} </p>
                </div>
              ))
            }
          </div>

          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' >
            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p key={index} onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border border-gray-400 ${item.time===slotTime ? 'bg-primary text-white':' border border-gray-500'}`}>
                {item.time}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full cursor-pointer my-6'>Book an appointment</button>
        </div>

        {/* related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        
    </div>
  )
}

export default Appointment