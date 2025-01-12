import { auth } from "@/auth";
import PostForm from "@/components/PostForm";

export default async function CreateNew() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return <div>Please login</div>;
  return (
    <div>
      <PostForm {...{ userId, method: "POST" }} />
    </div>
  );
}
