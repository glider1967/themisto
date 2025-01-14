"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();

  const generatePagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex justify-center w-full max-w-5xl mt-6 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="border-2 text-black px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base w-20 h-10 sm:w-24 sm:h-12 hover:bg-gray-200"
        >
          Prev
        </button>
      )}
      <div className="flex justify-center space-x-2">
        {generatePagination().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 sm:w-12 sm:h-12 mx-1 rounded text-sm sm:text-base ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "border-2 text-black hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="border-2 text-black px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base w-20 h-10 sm:w-24 sm:h-12 hover:bg-gray-200"
        >
          Next
        </button>
      )}
    </div>
  );
}
