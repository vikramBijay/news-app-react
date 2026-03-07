import React from 'react'
import TopStory from '../components/TopStory'
import Topics from '../components/Topics'
import { useContextApi } from '../context/ContextApi'

const Home = () => {
    const today = new Date().toDateString()
    const { category } = useContextApi()

  return (
    <div className='max-w-5xl mx-auto px-2 '>
        <div className=' my-12 space-y-2'>
            <h1 className='text-3xl font-semibold '>Your briefing</h1>
        <p className=' text-md px-2'>{today}</p>
        </div>
        <TopStory/> 
       <div className='mt-12 '>
        <p className='text-3xl capitalize font-semibold mb-8 '>your topics </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
             {
            category.map((item,index)=>{
                return <Topics head={item}/>
            })
        }
        </div>
       </div>
    </div>
  )
}

export default Home