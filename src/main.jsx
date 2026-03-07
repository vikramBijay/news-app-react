import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import { MyContextApi } from './context/ContextApi.jsx'

const route= createBrowserRouter([
{
   element: <App/>,
   path:'/',
   children:[
    {
    element:<Home/>,
    path:'/'
   },
    {
    element:<Category/>,
    path:'/category/:cat'
   },
  
  ]
}
])

createRoot(document.getElementById('root')).render(
  <>
    <MyContextApi>
      <RouterProvider router={route} />
    </MyContextApi>
  </>,
)
