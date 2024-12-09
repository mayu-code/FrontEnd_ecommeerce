import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const navigate = useNavigate();

  // Sample categories and subcategories data
  const categories = {
    Electronics: ["Headphones", "Laptops", "Cameras","Mobile"],
    Fashion: ["Shirt", "Cargo", "Shoes"],
    Home: ["Furniture", "Kitchen", "Decor"],
  };

  const categoryRef = useRef(null);
  const subcategoryRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
    setIsCategoryOpen(false); // Close category dropdown
    setIsSubcategoryOpen(true); // Open subcategory dropdown
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsSubcategoryOpen(false); // Close subcategory dropdown

    // Redirect to SelectedProduct page after both are selected
    navigate("/selectproduct", {
      state: { category: selectedCategory, subcategory },
    });
  };

  const clearSelection = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setIsCategoryOpen(false);
    setIsSubcategoryOpen(false);
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (categoryRef.current && !categoryRef.current.contains(e.target)) {
      setIsCategoryOpen(false);
    }
    if (subcategoryRef.current && !subcategoryRef.current.contains(e.target)) {
      setIsSubcategoryOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-start space-x-4">
      {/* Dropdowns Section */}
      <div className="flex">
        {/* Category Dropdown */}
        <div ref={categoryRef} className="relative inline-block text-left mr-4">
          <button
            className="inline-flex justify-center text-white w-40 px-4 py-2 bg-transparent shadow-sm text-sm font-medium "
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            {selectedCategory || "Category"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isCategoryOpen && (
            <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <div ref={subcategoryRef} className="relative inline-block text-left">
            <button
              className="inline-flex justify-center w-40 px-4 py-2 text-white shadow-sm text-sm font-medium"
              onClick={() => setIsSubcategoryOpen((prev) => !prev)}
            >
              {selectedSubcategory || "Subcategory"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isSubcategoryOpen && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories[selectedCategory]?.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSubcategoryChange(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Data Section */}
      <div className="flex flex-col items-end">
        <div className="flex flex-row">
          <div className="mx-2">
            {selectedCategory && (
              <div className="text-right">
                <span className="text-sm font-medium text-white ">
                  Category: {selectedCategory}
                </span>
              </div>
            )}
            {selectedSubcategory && (
              <div className="text-right">
                <span className="text-sm font-medium text-white">
                  Subcategory: {selectedSubcategory}
                </span>
              </div>
            )}
          </div>
          <div className="mx-2">
            {(selectedCategory || selectedSubcategory) && (
              <button
                onClick={clearSelection}
                className="mt-2 px-4 py-2 text-red-500 text-sm font-bold rounded-md hover:text-red-600"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
