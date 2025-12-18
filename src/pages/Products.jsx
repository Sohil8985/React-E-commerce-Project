import { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const filterData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const daynamicPage = Math.ceil(filterData?.length / 8);
  return (
    <div className="w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[30%] lg:w-[25%]">
                <FilterSection
                  search={search}
                  setSearch={setSearch}
                  brand={brand}
                  setBrand={setBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                  handleCategoryChange={handleCategoryChange}
                  handleBrandChange={handleBrandChange}
                />
              </div>
              {filterData?.length > 0 ? (
                <div className="flex flex-col w-full items-center mt-10">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 w-full">
                    {filterData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>

                  <div className="mt-8 flex justify-center w-full">
                    <Pagination
                      pageHandler={pageHandler}
                      page={page}
                      daynamicPage={daynamicPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full mt-10">
                  <Lottie
                    animationData={notfound}
                    classID="w-[250pxw] sm:w-[350px] md:w-[450px]"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop className="w-40 md:w-60">
              <source src={Loading} type="video/webm"></source>
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
