import React, { useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
const Header = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      name: "Category 1",
      subCategories: [
        "Sub Cat 1",
        "Sub Cat 2",
        "Sub Cat 3",
        "Sub Cat 4",
        "Sub Cat 1",
        "Sub Cat 2",
        "Sub Cat 3",
        "Sub Cat 4",
      ],
    },
    {
      name: "Category 2",
      subCategories: ["Sub Cat 5", "Sub Cat 6", "Sub Cat 7", "Sub Cat 8"],
    },
  ];

  return (
    <>
      <header
        className="bg-blue-500 text-white py-4 px-8 "
        onMouseLeave={() => setExpandedCategory(null)}
      >
        <div className="z-20">
          <div className="flex justify-between items-center my-2  ">
            <div className="text-3xl font-bold">Indie X</div>
            <IconContext.Provider value={{ color: "white", size: "1.1em" }}>
              <div className="flex gap-3">
                <CiSearch />
                <CiShoppingCart />
                <IoPersonOutline />
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-20">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setExpandedCategory(index)}
                >
                  <div className="text-md font-semibold">{category.name}</div>
                </div>
              ))}
            </div>
            <div className="text-md font-semibold">Switch to Selling</div>
          </div>

          <div
            className={`bg-blue-500 absolute z-20 flex w-full left-0 transition-transform duration-300 ${
              expandedCategory !== null
                ? "translate-y-3 opacity-100"
                : "translate-y-0 opacity-0 "
            } 
          
          `}
          >
            <div
              className={`  flex-col gap-y-5 grid grid-cols-2 w-1/2 ml-8 my-2 `}
            >
              {expandedCategory !== null &&
                categories[expandedCategory].subCategories.map(
                  (subCat, subIndex) => (
                    <div
                      key={subIndex}
                      className="py-1 px-2 hover:bg-gray-200 hover:text-black"
                    >
                      {subCat}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
