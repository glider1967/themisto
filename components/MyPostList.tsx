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
        posts.map((todo) => {
          return (
            <div key={todo.id} className="border rounded p-2 m-2">
              <div className="font-bold text-lg">{todo.title}</div>
              <div className="text-lg">{todo.description}</div>
              <Link href={`mypage/post/${todo.id}`} className="text-blue-400">
                Edit...
              </Link>
            </div>
          );
        })}
    </div>
  );
}
