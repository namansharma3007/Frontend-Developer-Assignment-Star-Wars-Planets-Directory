import React, { useState } from "react";

const Pagination = ({setCurrentPageNumber, currentPageNumber, totalData}) => {
  const [totalPages, setTotalPages] = useState(totalData/10);

  const incrementPage = (pageNo)=>{
    if(totalPages - 1 > pageNo){
      setCurrentPageNumber(pageNo+1);
    }
  }
  
  const decrementPage = (pageNo)=>{
    if(1 < pageNo){
      setCurrentPageNumber(pageNo-1);
    }
  }
  let paginationButtons = [];

  for (let i = 1; i < totalPages; i++) {
    paginationButtons[i - 1] = (
      <button
        key={i}
        className={`focus:bg-gray-500 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-200 ease-in-out ${currentPageNumber == i ? "bg-gray-500 text-white" : "bg-gray-200"}`}
        onClick={() => setCurrentPageNumber(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="flex shrink">
        <button className="rounded-tl rounded-bl bg-gray-200 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-100 ease-in-out hover:text-white" onClick={()=>decrementPage(currentPageNumber)}>
          <span>«</span>
        </button>
        {paginationButtons}
        <button className="rounded-tr rounded-br bg-gray-200 hover:bg-gray-500 h-10 w-10 flex items-center justify-center transition duration-300 ease-in-out hover:text-white" onClick={() => incrementPage(currentPageNumber)}>
          <span>»</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
