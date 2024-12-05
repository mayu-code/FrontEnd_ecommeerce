import React, { useState, useRef } from "react";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  // Sample categories and subcategories data
  const categories = {
    Electronics: ["Mobile Phones", "Laptops", "Cameras"],
    Fashion: ["Men's Clothing", "Women's Clothing", "Accessories"],
    Home: ["Furniture", "Kitchen", "Decor"],
  };

  // Refs to close dropdowns when clicking outside
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
  };

  const clearSelection = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setIsCategoryOpen(false);
    setIsSubcategoryOpen(false);
  };

  // Close dropdowns if clicked outside
  const handleClickOutside = (e) => {
    if (categoryRef.current && !categoryRef.current.contains(e.target)) {
      setIsCategoryOpen(false);
    }
    if (subcategoryRef.current && !subcategoryRef.current.contains(e.target)) {
      setIsSubcategoryOpen(false);
    }
  };

  React.useEffect(() => {
    // Add event listener for clicks outside the dropdowns
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
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
            className="inline-flex justify-center w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
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
              className="inline-flex justify-center w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
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
        <div className="flex flex-row ">
        <div className="mx-2">

        {selectedCategory && (
          <div className="text-right">
            <span className="font-medium text-gray-700">
              Category: {selectedCategory}
            </span>
          </div>
        )}
        {selectedSubcategory && (
          <div className="text-right">
            <span className="font-medium text-gray-700">
              Subcategory: {selectedSubcategory}
            </span>
          </div>
        )}
        </div>
        <div className="mx-2">

        {(selectedCategory || selectedSubcategory) && (
          <button
            onClick={clearSelection}
            className="mt-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
