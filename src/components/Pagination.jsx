import React from 'react'

const page=(curr,total)=>{
   const pages=[];
if(total<=5){
    for(let i=1;i<=5;i++){
        pages.push(i)
    }
}
else{
    // if page is in starting..
    if(curr <= 3){
        pages.push(1,2,3,'...',total)
    }
    // pages in last
    else if(curr >= total-2){
        pages.push(1,'...',total-2 , total-1 ,total)
    }
  // center
 else {
  pages.push(
    1,
    '...',
    curr - 1,
    curr,
    curr + 1,
    '...',
    total
  );
}

}
console.log(pages)
 return pages
}

const Pagination = ({totalpage , currpage , setcurrpage}) => {
  return (
    <div className='my-5 flex items-center justify-center gap-4 '>
        <button onClick={()=>setcurrpage(currpage-1)} disabled={currpage===1} className='border text-lg font-semibold capitalize py-2 px-4 cursor-pointer '>prev</button>
        {
            page(currpage,totalpage).map((items,index)=>{
                
              return  <span onClick={()=>typeof items==='number' && setcurrpage(items)} className={`${items=== currpage ? "text-red-500" : ""} ${typeof items==='number' ? 'cursor-pointer' : 'cursor-default'} text-lg font-semibold`}>{items}</span>
            })
        }
        <button onClick={()=>setcurrpage(currpage+1)} disabled={currpage===totalpage} className='border text-lg font-semibold capitalize py-2 px-4 cursor-pointer '>prev</button>
    </div>
  )
}

export default Pagination