// src/components/CategorySelector.jsx
import React, { useState } from "react";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Sample categories and subcategories data
  const categories = {
    Electronics: ["Mobile Phones", "Laptops", "Cameras"],
    Fashion: ["Men's Clothing", "Women's Clothing", "Accessories"],
    Home: ["Furniture", "Kitchen", "Decor"],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
  };

  return (
    <div className="relative">
      {/* Category Dropdown */}
      <div className="relative inline-block text-left">
        <button
          className="inline-flex justify-center w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedCategory || "Select Category"}
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
      </div>

      {/* Subcategory Dropdown */}
      {selectedCategory && (
        <div className="relative inline-block text-left ml-4">
          <button
            className="inline-flex justify-center w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
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
          <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
            {categories[selectedCategory]?.map((subcategory) => (
              <button
                key={subcategory}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setSelectedSubcategory(subcategory)}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
