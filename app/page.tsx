import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main>
      <div className="text-lg">Recent updates:</div>
      <PostList />
    </main>
  );
}
