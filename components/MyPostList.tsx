import { prisma } from "@/lib/prisma";
import Link from "next/link";

const getPosts = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: { authorId: authorId },
  });
  return posts;
};

export default async function MyPostList({ userId }: { userId: string }) {
  const posts = await getPosts(userId);
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts &&
        posts.map((post) => {
          let desc = post.description;
          if (desc.length > 50) desc = desc.slice(0, 50) + "...";
          return (
            <div key={post.id} className="border rounded p-2 m-2">
              <div className="font-bold text-lg">{post.title}</div>
              <div className="text-lg break-words">{desc}</div>
              <Link href={`mypage/post/${post.id}`} className="text-blue-400">
                Edit...
              </Link>
            </div>
          );
        })}
    </div>
  );
}
