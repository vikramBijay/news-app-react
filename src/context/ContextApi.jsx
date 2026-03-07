import axios from "axios";
import { Children, createContext, useContext, useState } from "react";

const ContextApi= createContext()


const MyContextApi=({children})=>{
    const [data,setdata]=useState([])
      const [handlecat,sethandlecat]=useState([])

    const apikey=import.meta.env.VITE_NEWS_API

 const baseUrl=axios.create({baseURL:'https://newsapi.org/v2'})
const fetchdata=async(url='/top-headlines?country=us&')=>{
    try {
        const res= await baseUrl.get(`${url}apikey=${apikey}`)
       
        return (res.data.articles)
    } catch (error) {
        console.error('error on fetch');
        
    }
}
const category=['business', 'entertainment' , 'general' , 'health', 'science', 'sports', 'technology']
   return <ContextApi.Provider value={{fetchdata,data,category,setdata,handlecat,sethandlecat}}>{children}</ContextApi.Provider>
}
const useContextApi=()=>{
    return ( useContext(ContextApi))
}
export {useContextApi,MyContextApi}