import React, { useEffect, useState } from 'react'
import TopStory from '../components/TopStory'
import Topics from '../components/Topics'
import { useContextApi } from '../context/ContextApi'

const Home = () => {
  const today = new Date().toDateString()
  const { category, fetchAllCategories, categoryData } = useContextApi()
  const [loadingCats, setLoadingCats] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Only fetch once — avoid refetch if already loaded
    if (loaded || Object.keys(categoryData).length > 0) return
    setLoadingCats(true)
    fetchAllCategories().finally(() => {
      setLoadingCats(false)
      setLoaded(true)
    })
  }, [])

  return (
    <div className='max-w-5xl mx-auto px-2'>
      <div className='my-12 space-y-2'>
        <h1 className='text-3xl font-semibold'>Your briefing</h1>
        <p className='text-md px-2'>{today}</p>
      </div>

      <TopStory />

      <div className='mt-12'>
        <p className='text-3xl capitalize font-semibold mb-8'>your topics</p>

        {loadingCats && Object.keys(categoryData).length === 0 ? (
          // Full skeleton while first batch loads
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {category.map((cat) => (
              <div key={cat} className='bg-gray-50 p-4 rounded-xl animate-pulse'>
                <div className='h-7 w-32 bg-gray-200 rounded mb-6' />
                <hr className='mb-4' />
                {[1, 2, 3].map((i) => (
                  <div key={i} className='flex gap-3 py-3 border-b border-gray-200'>
                    <div className='flex-1 space-y-2'>
                      <div className='h-3 bg-gray-200 rounded w-1/3' />
                      <div className='h-4 bg-gray-200 rounded w-full' />
                      <div className='h-3 bg-gray-200 rounded w-1/4' />
                    </div>
                    <div className='w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {category.map((item) => (
              <Topics
                key={item}
                head={item}
                articles={categoryData[item] || []}
                loading={loadingCats && !categoryData[item]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home