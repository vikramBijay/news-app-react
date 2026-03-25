import React from "react";
import { useContextApi } from "../context/ContextApi";
import { FaChevronRight } from "react-icons/fa";
import Newssection from "./Newssection";
import { useNavigate } from "react-router-dom";

const Topics = ({ head, articles = [], loading = false }) => {
  const navigate = useNavigate();

  // Don't render empty card once loading is done
  if (!loading && articles.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <h1
          onClick={() => navigate(`/category/${head}`)}
          className="cursor-pointer text-2xl font-semibold capitalize hover:text-red-500 transition-colors"
        >
          {head}
        </h1>
        <FaChevronRight className="text-gray-500" />
      </div>
      <hr className="my-6" />

      {/* Skeleton while loading */}
      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-gray-200">
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {articles.slice(0, 3).map((item, index) => (
            <Newssection key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;