import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextApi } from "../context/ContextApi";
import { IoBookOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import Loader from "./Loader";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 8;

const SingleCat = () => {
  const [currpage, setcurrpage] = useState(1);
  const { cat } = useParams();
  const [loading, setloading] = useState(false);
  const { fetchdata, data, setdata } = useContextApi();

  const totalpage = Math.max(1, Math.floor((data?.length || 0) / ITEMS_PER_PAGE));

  useEffect(() => {
    (async () => {
      setloading(true);
      setcurrpage(1);

      const isGNewsTopic = [
        "business", "entertainment", "general",
        "health", "science", "sports", "technology",
      ].includes(cat);

      // ✅ GNews uses "topic" param, not "category"
      const res = isGNewsTopic
        ? await fetchdata("top-headlines", { topic: cat })
        : await fetchdata("search", { q: cat });

      setloading(false);
      setdata(res);
    })();
  }, [cat]);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-12">
      <div className="flex gap-4 items-center">
        <h1 className="text-2xl font-semibold capitalize">{cat}</h1>
        <FaChevronRight className="text-gray-500" />
      </div>
      <hr className="my-6" />

      <div className="space-y-8 px-4">
        {data
          ?.slice((currpage - 1) * ITEMS_PER_PAGE, currpage * ITEMS_PER_PAGE)
          .map((items, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col md:flex-row gap-6">
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

                <div className="flex-1 space-y-4">
                  <h1 className="text-xl font-semibold">{items.title}</h1>
                  <p className="text-md text-gray-600">{items.description}</p>
                  <p className="text-gray-500 text-sm">{items.content?.slice(0, 120)}...</p>
                  <p className="text-sm font-medium capitalize">source: {items.source?.name}</p>
                </div>
              </div>

              <div
                className="flex items-center justify-center gap-4 w-full bg-gray-300 py-2 rounded-xl capitalize text-lg font-semibold cursor-pointer hover:bg-gray-400 transition-colors"
                onClick={() => window.open(items.url)}
              >
                <IoBookOutline className="w-5 h-5" />
                <p>see more details</p>
              </div>
              <hr />
            </React.Fragment>
          ))}
      </div>

      <Pagination totalpage={totalpage} currpage={currpage} setcurrpage={setcurrpage} />
    </div>
  );
};

export default SingleCat;