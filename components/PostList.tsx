"use client";

import { getPostsSchema } from "@/lib/schema";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// https://qiita.com/RinTenma/items/4bc4b04aec602a147d80
export default function PostList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData(page: number) {
    try {
      const response = await fetch(`/api/post?page=${page}`);
      if (!response.ok) {
        throw new Error("Bad response");
      }
      const newData = await response.json();
      const validated = getPostsSchema.parse(newData);
      setTotalPages(validated.totalPages);
      setCurrentPage(validated.currentPage);
      setData(validated.posts);
    } catch (error) {
      console.error("Failed:", error);
    }
  }

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    fetchData(page);
  }, [searchParams]);

  const generatePagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map((post) => {
            let desc = post.description;
            if (desc.length > 50) desc = desc.slice(0, 50) + "...";
            return (
              <div key={post.id} className="border rounded p-2 m-2">
                <div className="font-bold text-lg">{post.title}</div>
                <div className="text-lg break-words">{desc}</div>
                <Link href={`post/${post.id}`} className="text-blue-400">
                  View more...
                </Link>
              </div>
            );
          })}
      </div>
      {totalPages > 1 && (
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
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                className={`w-10 h-10 sm:w-12 sm:h-12 mx-1 rounded text-sm sm:text-base ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "border-2 text-black hover:bg-gray-200"
                }`}
                disabled={typeof page !== "number"}
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
      )}
    </div>
  );
}
