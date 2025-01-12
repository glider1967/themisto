import { prisma } from "@/lib/prisma";
import Link from "next/link";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { status: true },
  });
  return posts;
};

export default async function PostList() {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts &&
        posts.map((todo) => {
          return (
            <div key={todo.id} className="border rounded p-2 m-2">
              <div className="font-bold text-lg">{todo.title}</div>
              <div className="text-lg">{todo.description}</div>
              <Link href={`post/${todo.id}`} className="text-blue-400">
                View more...
              </Link>
            </div>
          );
        })}
    </div>
  );
}
