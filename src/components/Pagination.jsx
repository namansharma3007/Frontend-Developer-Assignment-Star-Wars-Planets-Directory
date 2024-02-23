import React from "react";

// Pagination component
const Pagination = ({ setCurrentPageNumber, currentPageNumber, totalData }) => {
  const totalPages = Math.floor(totalData / 10);

  // Function to increment page number
  const incrementPage = (pageNo) => {
    // Check if there are more pages to increment to
    if (totalPages - 1 > pageNo) {
      setCurrentPageNumber(pageNo + 1); // Increment page number
    }
  }

  // Function to decrement page number
  const decrementPage = (pageNo) => {
    // Check if there are more pages to decrement to
    if (1 < pageNo) {
      setCurrentPageNumber(pageNo - 1); // Decrement page number
    }
  }

  // Array to store pagination buttons JSX
  let paginationButtons = [];

  // Calculate total number of pages

  // Generate pagination buttons JSX
  for (let i = 1; i < totalPages; i++) {
    paginationButtons[i - 1] = (
      <button
        key={i}
        className={`focus:bg-gray-500 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-200 ease-in-out ${currentPageNumber === i ? "bg-gray-500 text-white" : "bg-gray-200"}`}
        onClick={() => setCurrentPageNumber(i)}
      >
        {i}
      </button>
    );
  }

  // Render pagination component
  return (
    <div className="flex justify-center mt-10">
      <div className="flex shrink">
        {/* Button to decrement page number */}
        <button className="rounded-tl rounded-bl bg-gray-200 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-100 ease-in-out hover:text-white" onClick={() => decrementPage(currentPageNumber)}>
          <span>«</span>
        </button>

        {/* Render pagination buttons */}
        {paginationButtons}

        {/* Button to increment page number */}
        <button className="rounded-tr rounded-br bg-gray-200 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-300 ease-in-out hover:text-white" onClick={() => incrementPage(currentPageNumber)}>
          <span>»</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
