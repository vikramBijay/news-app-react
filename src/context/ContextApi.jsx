import axios from "axios";
import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

const MyContextApi = ({ children }) => {
  const [data, setdata] = useState([]);
  const [handlecat, sethandlecat] = useState("");
  // Stores { business: [...], sports: [...], ... } for home page
  const [categoryData, setCategoryData] = useState({});

  const apikey = import.meta.env.VITE_NEWS_API;

  const baseUrl = axios.create({
    baseURL: "https://gnews.io/api/v4",
  });

  /**
   * fetchdata(type, params)
   * type   → "top-headlines" | "search"
   * params → GNews query params
   * NOTE: GNews uses "topic" not "category"
   */
  const fetchdata = async (type = "top-headlines", params = {}) => {
    try {
      const res = await baseUrl.get(`/${type}`, {
        params: {
          lang: "en",
          country: "us",
          max: 10,
          apikey,
          ...params,
        },
      });
      return res.data.articles || [];
    } catch (error) {
      console.error("GNews fetch error:", error?.response?.data || error.message);
      return [];
    }
  };

  /**
   * fetchAllCategories — fetches all 7 categories sequentially (1/sec)
   * so we never hit the rate limit on home page load
   */
  const fetchAllCategories = async () => {
    const cats = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const result = {};
    for (const cat of cats) {
      const articles = await fetchdata("top-headlines", { topic: cat, max: 10 });
      result[cat] = articles;
      // 1.1 second gap between each request — GNews allows max 1 req/sec
      await new Promise((r) => setTimeout(r, 1100));
    }
    setCategoryData(result);
    return result;
  };

  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

  return (
    <ContextApi.Provider
      value={{
        fetchdata,
        fetchAllCategories,
        data,
        category,
        categoryData,
        setCategoryData,
        setdata,
        handlecat,
        sethandlecat,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

const useContextApi = () => useContext(ContextApi);

export { useContextApi, MyContextApi };