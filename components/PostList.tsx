"use client";
import useSWR from "swr";
import { getPostsSchema } from "@/lib/schema";
import PostGrid from "./PostGrid";
import Pagination from "./Pagination";
import LoadingCircle from "./LoadingCircle";

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return getPostsSchema.parse(data);
};

export default function PostList(params: { page: string }) {
  const page = parseInt(params.page || "1", 10);

  const { data, isLoading } = useSWR(`api/post?page=${page}`, fetcher);

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (!data) {
    return <div>Error loading posts</div>;
  }

  const { posts, totalPages, currentPage } = data;

  return (
    <div>
      <PostGrid posts={posts} />
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
