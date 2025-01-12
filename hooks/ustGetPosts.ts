import { Post } from "@prisma/client";
import useSWR from "swr";

export const useGetPosts = () => {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR("/api/post", fetcher);
  const posts = data?.todos as Post[] | null;
  return { posts, isLoading, error, mutate };
};
