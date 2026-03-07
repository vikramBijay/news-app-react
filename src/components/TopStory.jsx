import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useContextApi } from '../context/ContextApi'
import { IoBookOutline } from 'react-icons/io5'
import Topics from './Topics'
import Loader from './Loader'

const TopStory = () => {
  const { fetchdata, data ,setdata} = useContextApi()
  const [loading,setloading]=useState(false)
    const [isimg,setisimg]=useState(true)
  useEffect(()=>{
    (async()=>{
        setloading(true)
        const res = await fetchdata()
setloading(false)
        setdata(res)
    })()

  },[])
  if(loading) return <Loader />
  return(
    <div className=' bg-gray-50 rounded-xl p-4'>

        <div className='flex gap-4 mb: items-center'>
    <h1 className='text-2xl font-semibold capitalize '>top stories</h1>
    <FaChevronRight className='text-gray-500'/>
        </div>
        <hr className='my-6'/>
        {/* stories */}
        <div className='space-y-8 px-4'>
            {
                data.slice(0,2).map((items,index)=>{
                    return( 
                        <>
                        <div className='flex flex-col md:flex-row  gap-6'>
                            {/* images */}
                             <div className='h-60 w-full md:w-80 overflow-hidden rounded relative '>
                                {/* */}
                                {
                           isimg && 
                              <div className=" absolute inset-0 flex justify-center items-center space-x-1 text-sm text-gray-700">
		 
				<svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
					<path clip-rule='evenodd'
						d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
						fill='currentColor' fill-rule='evenodd' />
				</svg>
		<div>Loading ...</div>
	</div>
                           
                                }
   <img src={items.urlToImage} alt="" className='w-full h-full object-cover ' onLoad={()=>setisimg(false)} onError={()=>setisimg(false)}/> 
                            </div>
                            {/* text */}
                            <div className='flex-1  space-y-4'>
                                <h1 className='text-xl font-semibold capitalize'>{items.title}</h1>
                                <p className='text-md text-gray-600'>{items.description}</p>
                                <p className='text-gray-500 text-sm'>{items.content?.slice(0,120)}...</p>
                                <p className='text-sm font-medium capitalize'>source: {items.source?.name}</p>
                            </div>
                        </div> 
                           <div onClick={()=>{window.open(items.url)}} className='flex items-center justify-center gap-4 w-full bg-gray-300 py-2 rounded-xl capitalize text-lg font-semibold cursor-pointer'>
                            <IoBookOutline className='w-5 h-5 font-semibold'/>
                            <p>see more details</p>
                           </div>
                           <hr />

                          
                        </>
                    )
                })
            }
        </div>

    </div>
  )
}


export default TopStory