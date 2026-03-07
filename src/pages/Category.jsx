import React from 'react'
import { useParams } from 'react-router-dom'
import SingleCat from '../components/SingleCat'

const Category = () => {
  const {cat}= useParams()
  return (
    <div className='max-w-5xl mx-auto'>
      <SingleCat />
    </div>
  )
}

export default Category