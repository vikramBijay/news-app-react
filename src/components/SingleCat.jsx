import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContextApi } from '../context/ContextApi'
import { IoBookOutline } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa'
import Loader from './Loader'
import Pagination from './Pagination'

const SingleCat = () => {
    const [currpage,setcurrpage]=useState(1)
  const {cat}= useParams()
  const [loading,setloading]=useState(false)
  const [isimg,setisimg]=useState(true)
    const { fetchdata, data ,setdata,handlecat} = useContextApi()
  

   const totalpage= Math.floor(data?.length/8)
   console.log(totalpage);
   console.log(currpage);
   
   
    
  useEffect(()=>{
    (async()=>{
        setloading(true)
        const res = await fetchdata(`/everything?q=${cat}&`)
        setloading(false)
        setdata(res)
    })()
  },[cat])
   if(loading) return <Loader/>
return(
    <div className=' bg-gray-50 rounded-xl p-4 mt-12'>

        <div className='flex gap-4 mb: items-center'>
    <h1 className='text-2xl font-semibold capitalize '>{cat}</h1>
    <FaChevronRight className='text-gray-500'/>
        </div>
        <hr className='my-6'/>
        {/* stories */}
        <div className='space-y-8 px-4'>
            {
                data?.slice((currpage-1)*8,currpage*8).map((items,index)=>{
                    return( 
                        <>
                        <div className='flex flex-col md:flex-row gap-6 '>
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
                           <div className='flex items-center justify-center gap-4 w-full bg-gray-300 py-2 rounded-xl capitalize text-lg font-semibold cursor-pointer'>
                            <IoBookOutline className='w-5 h-5 font-semibold'/>
                            <p onClick={()=>{window.open(items.url)}}>see more details</p>
                           </div>
                           <hr />

                          
                        </>
                    )
                })
            }
        </div>
{/* page */}
<Pagination totalpage={totalpage} currpage={currpage} setcurrpage={setcurrpage}/>

    </div>
  )
}

export default SingleCat