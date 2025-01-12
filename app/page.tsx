import { auth } from "@/auth";
import PostList from "@/components/PostList";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      {session?.user && (
        <Link href="/mypage" className="text-blue-400 p-2">
          My Page
        </Link>
      )}

      <PostList />
    </main>
  );
}
