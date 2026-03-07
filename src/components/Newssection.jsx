import React from 'react'

const Newssection = ({ item }) => {
  return (
    <div className="border-b border-gray-400 p-4">
      
      <div className="flex flex-col min-[1024px]:flex-row gap-4 items-start">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-1 px-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {item?.source?.name || "Unknown Source"}
          </p>

          <h2 onClick={()=>{window.open(item.url)}} className="text-base font-semibold leading-snug  hover:underline cursor-pointer line-clamp-2">
            {item?.title}
          </h2>

          <p className="text-xs text-gray-400">
            {new Date(item?.publishedAt).toLocaleDateString()}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        {item?.urlToImage && (
          <div className="w-full min-[1024px]:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden ">
            <img
              src={item.urlToImage}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
      </div>

    </div>
  )
}

export default Newssection
