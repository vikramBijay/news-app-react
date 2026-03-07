import React, { useEffect, useState } from 'react'
import { useContextApi } from '../context/ContextApi'
import { FaChevronRight } from 'react-icons/fa'
import Newssection from './Newssection'
import { useNavigate } from 'react-router-dom'

const Topics = ({head}) => {
  const [articals,setarticals] = useState([])
     const {fetchdata}=useContextApi()
     const navigate=useNavigate()
  
    useEffect(()=>{
        (async()=>{
           const res= await fetchdata(`/everything?q=${head}&`)
           setarticals(res)
        }) ()
    },[head])

    
  return (
   <div className='bg-gray-50 p-4 rounded-xl'>
   
    {/* header */}
     <div>
        <div className='flex gap-4 mb: items-center'>
        <h1 onClick={()=>navigate(`/category/${head}`)} className='cursor-pointer text-2xl font-semibold capitalize '>{head}</h1>
        <FaChevronRight className='text-gray-500'/>
            </div>
            <hr className='my-6'/>
           
            {/* news */}
            <div className=' '>
                {
                    articals?.slice(0,3).map((item,index)=>{
                        return (
                        
                            <Newssection key={index} item={item}/>
                       
                    )
                    })
                }
            </div>
     </div>
   </div>
  )
}

export default Topics