import { auth } from "@/auth";
import MyPostList from "@/components/MyPostList";
import Link from "next/link";

export default async function MyPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return <div>Please login</div>;
  return (
    <div className="p-2 space-y-3">
      <div>Your Posts</div>
      <MyPostList {...{ userId }} />
      <button className="border-2 rounded border-slate-200 p-1">
        <Link href={"/mypage/create"}>Create New</Link>
      </button>
      <div className="text-blue-400 p-1">
        <Link href={"/"}>Return to Home</Link>
      </div>
    </div>
  );
}
