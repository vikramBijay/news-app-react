import React, { useState, useEffect, useRef } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaRegUserCircle, FaTimes } from 'react-icons/fa'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContextApi } from '../context/ContextApi'

const Nav = () => {
  const { category, sethandlecat, fetchdata, setdata } = useContextApi()
  const navigate = useNavigate()
  const [opennav, setopennav] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const timer = useRef(null)

  // Debounced search
  const handlesearch = (e) => {
    const searchvalue = e.target.value
    if (!searchvalue) return
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      const res = await fetchdata(`/everything?q=${searchvalue}&`)
      setdata(res)
    }, 500)
  }

  // Close sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setopennav(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = opennav ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [opennav])

  return (
    <>
      <div className='py-4 px-8 shadow-2xl'>

        {/* ── Top Row ── */}
        <div className='flex items-center justify-between px-2 md:px-8'>

          {/* Logo */}
          <h1 className='text-xl font-semibold capitalize'>
            Daily{' '}
            <span
              className='cursor-pointer hover:border-b-2 border-red-500'
              onClick={() => navigate('/')}
            >
              news
            </span>
          </h1>

          {/* Center — Desktop Search + Icons */}
          <div className='flex items-center gap-4 mt-2'>
            {/* Desktop Search */}
            <div className='w-[250px] border border-gray-200 items-center md:flex justify-center gap-2 rounded-full hidden'>
              <span className='p-2 cursor-pointer'>
                <CiSearch className='w-5 h-5' />
              </span>
              <input
                onChange={handlesearch}
                type='text'
                placeholder='Search...'
                className='outline-none placeholder:capitalize w-full pr-3'
              />
            </div>
            <span><IoIosHelpCircleOutline className='w-5 h-5 cursor-pointer hidden md:block' /></span>
            <span><IoSettingsSharp className='w-5 h-5 cursor-pointer hidden md:block' /></span>
          </div>

          {/* Right — User + Mobile Icons */}
          <div className='flex items-center gap-4'>
            <FaRegUserCircle className='w-8 h-8 cursor-pointer hidden md:block' />

            {/* Mobile: Search icon */}
            <CiSearch
              className='w-6 h-6 cursor-pointer md:hidden'
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {/* Mobile: Hamburger */}
            <RxHamburgerMenu
              className='w-6 h-6 cursor-pointer md:hidden'
              onClick={() => setopennav(true)}
            />
          </div>
        </div>

        {/* ── Mobile Search Bar (toggle) ── */}
        {searchOpen && (
          <div className='md:hidden mt-3 mx-2 border border-gray-200 flex items-center gap-2 rounded-full px-3'>
            <CiSearch className='w-5 h-5 text-gray-400' />
            <input
              onChange={handlesearch}
              type='text'
              placeholder='Search...'
              autoFocus
              className='outline-none placeholder:capitalize py-2 w-full text-sm'
            />
          </div>
        )}

        {/* ── Desktop Category Row ── */}
        <div className='max-w-7xl mx-auto mt-4 capitalize'>
          <div className='items-center justify-center gap-4 hidden md:flex'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? 'text-red-500 font-semibold' : 'hover:text-red-500 transition-colors'
              }
            >
              home
            </NavLink>
            <hr className='border border-r-2 border-black h-4 w-0' />
            <div className='flex items-center gap-8 flex-wrap'>
              {category.map((item) => (
                <NavLink
                  key={item}
                  to={`/category/${item}`}
                  onClick={() => sethandlecat(item)}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-red-500 font-semibold border-b-2 border-red-500'
                      : 'hover:text-red-500 transition-colors duration-200'
                  }
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Overlay ── */}
      {opennav && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={() => setopennav(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
          ${opennav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
          <h1 className='text-xl font-semibold capitalize'>
            Daily <span className='text-red-500'>News</span>
          </h1>
          <FaTimes
            className='w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500 transition-colors'
            onClick={() => setopennav(false)}
          />
        </div>

        {/* Sidebar Nav Links */}
        <nav className='flex flex-col px-4 py-5 gap-1'>
          <NavLink
            to='/'
            onClick={() => setopennav(false)}
            className={({ isActive }) =>
              `text-base font-semibold capitalize px-3 py-3 rounded-lg transition-colors duration-200
              ${isActive ? 'bg-red-50 text-red-500' : 'text-gray-700 hover:bg-gray-100 hover:text-red-500'}`
            }
          >
            Home
          </NavLink>

          <p className='text-xs text-gray-400 uppercase font-semibold px-3 pt-3 pb-1 tracking-widest'>
            Categories
          </p>

          {category.map((item) => (
            <NavLink
              key={item}
              to={`/category/${item}`}
              onClick={() => { sethandlecat(item); setopennav(false) }}
              className={({ isActive }) =>
                `text-base capitalize px-3 py-2.5 rounded-lg transition-colors duration-200
                ${isActive ? 'bg-red-50 text-red-500 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-red-500'}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className='absolute bottom-0 left-0 right-0 px-5 py-5 border-t border-gray-100'>
          <div className='flex items-center gap-4 text-gray-500'>
            <IoIosHelpCircleOutline className='w-6 h-6 cursor-pointer hover:text-red-500' />
            <IoSettingsSharp className='w-6 h-6 cursor-pointer hover:text-red-500' />
            <FaRegUserCircle className='w-6 h-6 cursor-pointer hover:text-red-500' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav