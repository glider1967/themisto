import { auth } from "@/auth";
import PostForm from "@/components/PostForm";
import { prisma } from "@/lib/prisma";
import { toFrontObject } from "@/lib/videoLinkUtil";

const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { musics: true },
  });
  return post;
};

export default async function UpdatePost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return <div>Please login</div>;

  const post = await getPost(id);
  if (!post) return <div>unknown post</div>;
  if (post.authorId !== userId)
    return <div>invalid post id: you cannot edit this post</div>;
  const initialData = {
    title: post.title,
    desc: post.description,
    status: post.status,
    musics: post.musics.map((music) => {
      return {
        title: music.title,
        artist: music.artist,
        videoLink: toFrontObject(music.linkType, music.linkContent),
      };
    }),
  };

  return (
    <div>
      <PostForm {...{ userId, initialData, method: "PUT", postId }} />
    </div>
  );
}
