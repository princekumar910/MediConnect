import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function Appointement() {
  const {id} =useParams();
  const {doctors} = useContext(AppContext);

  const [docInfo , setDocInfo] = useState();

const fetchDocInfo = async ()=>{
  const docInfo = doctors.find(doc => doc._id == id);
  setDocInfo(docInfo);
}

console.log(docInfo);

useEffect(()=>{
  fetchDocInfo();
} ,[doctors , id])

  return (
    <div>
      {/* --------Doctors details----------- */}
      <div>
        <div>
          <img src={docInfo.image} alt=""  />
        </div>
      </div>



    </div>
  )
}

export default Appointement