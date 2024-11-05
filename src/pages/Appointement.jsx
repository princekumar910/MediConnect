import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

function Appointement() {
  const { id } = useParams();
  const { doctors , currencySymbol} = useContext(AppContext);

  const [docInfo, setDocInfo] = useState();
  const [docSlots , setDocSlots]= useState([]);
  const [slotIndex , setSlotIndex] = useState(0);
  const [slotTime , setSlotTime] = useState("");


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id == id);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = ()=>{
        setDocSlots([]);

        // getting current date 

        let today = new Date();
        for(let i = 0 ; i < 7 ; i++){
          // getting date with index

          let currentDate = new Date(today);
          currentDate.setDate(today.getDate() + i);
          console.log(currentDate);

          // setting end time of the date with index

          let endTime = new Date();
          endTime.setDate(today.getDate()+i);
          endTime.setHours(21,0,0,0);
          console.log(endTime)

          // setting hours 
          if(today.getDate() === currentDate.getDate()){
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
            currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0);
          }
          else{
            currentDate.setHours(10);
            currentDate.setMinutes(0);
          }
          
          let timeSlots = [];
          while(currentDate < endTime){
             
            let formattedTime = currentDate.toLocaleDateString([] , {hour:'2-digit' , minute:'2-digit'}) // empty array use locale time system 

            // add slot to array

            timeSlots.push({
              datetime : new Date(currentDate),
              time : formattedTime

            })

            // increament time by 30 min
            currentDate.setMinutes(currentDate.getMinutes() + 30);

          }

          setDocSlots(prev => ([...prev , timeSlots]));


        }
        
  }



  useEffect(() => {
    fetchDocInfo();
  }, [doctors, id])

  useEffect(()=>{
    getAvailableSlots() ;
  } , [docInfo]);
  
  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  return docInfo && (
    <div>
      {/* --------Doctors details----------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg py-7 p-8 bg-whitem-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ----Doc info : name degree , experiece */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}  <img src={assets.verified_icon} alt="" /> </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ----------doctor about ---------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /> </p>
            <p className='text-sm text-gray-500 max-w-700px mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee : {currencySymbol}{docInfo.fees}</p>
        </div>
      </div>



    </div>
  )
}

export default Appointement