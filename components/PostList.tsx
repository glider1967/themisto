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
        posts.map((post) => {
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
  );
}
