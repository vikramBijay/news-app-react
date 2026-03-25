import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useContextApi } from "../context/ContextApi";
import { IoBookOutline } from "react-icons/io5";
import Loader from "./Loader";

const TopStory = () => {
  const { fetchdata, data, setdata } = useContextApi();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async () => {
      setloading(true);
      // No topic filter — fetch general top headlines
      const res = await fetchdata("top-headlines");
      setloading(false);
      setdata(res);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-2xl font-semibold capitalize">top stories</h1>
        <FaChevronRight className="text-gray-500" />
      </div>
      <hr className="my-6" />

      <div className="space-y-8 px-4">
        {data?.slice(0, 2).map((items, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image — GNews uses "image" not "urlToImage" */}
              <div className="h-60 w-full md:w-80 overflow-hidden rounded relative bg-gray-200">
                {items.image ? (
                  <img
                    src={items.image}
                    alt={items.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 space-y-4">
                <h1 className="text-xl font-semibold">{items.title}</h1>
                <p className="text-md text-gray-600">{items.description}</p>
                <p className="text-gray-500 text-sm">{items.content?.slice(0, 120)}...</p>
                <p className="text-sm font-medium capitalize">source: {items.source?.name}</p>
              </div>
            </div>

            <div
              onClick={() => window.open(items.url)}
              className="flex items-center justify-center gap-4 w-full bg-gray-300 py-2 rounded-xl capitalize text-lg font-semibold cursor-pointer hover:bg-gray-400 transition-colors"
            >
              <IoBookOutline className="w-5 h-5" />
              <p>see more details</p>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopStory;