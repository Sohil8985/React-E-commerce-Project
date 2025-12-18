import { useEffect } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { data } = getData();

  const getUniqeCategoty = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = [...new Set(newVal)];
    return newVal;
  };

  const categoryOnDate = getUniqeCategoty(data, "category");

  return (
    <div className="bg-[#101829] w-full py-8 px-4 ">
      <div className="max-w-7xl mx-auto grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 py-6 px-4 space-x-20">
        {categoryOnDate?.map((item, index) => {
          return (
            <button
              key={index}
              className="w-full text-center py-2 px-3 uppercase bg-linear-to-r from-red-500 to-purple-500
                text-white rounded-md font-medium hover:scale-105 transition shadow-md"
              onClick={() => navigate(`/category/${item}`)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
