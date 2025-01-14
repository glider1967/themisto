import { getPostsSchema } from "@/lib/schema";
import PostGrid from "./PostGrid";
import Pagination from "./Pagination";

async function fetchPosts(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return getPostsSchema.parse(data);
}

export default async function PostList(params: { page: string }) {
  const page = parseInt(params.page || "1", 10);
  const { posts, totalPages, currentPage } = await fetchPosts(page);

  return (
    <div>
      <PostGrid posts={posts} />
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
