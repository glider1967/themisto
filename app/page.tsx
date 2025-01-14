import PostList from "@/components/PostList";

export default async function Home(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await props.searchParams;
  return (
    <main>
      <div className="text-lg">Recent updates:</div>
      <PostList page={page} />
    </main>
  );
}
