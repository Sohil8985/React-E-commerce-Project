import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  //   fetching all products from api
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products?limit=150`);
      const productsData = res.data.products;
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };
  const getUniqeCategoty = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = ["All",...new Set(newVal)];
    return newVal;
  };

  const categoryOnDate = getUniqeCategoty(data, "category");
  const brandOnDate = getUniqeCategoty(data, "brand")
  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts, categoryOnDate, brandOnDate}}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
