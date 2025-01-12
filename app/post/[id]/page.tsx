import NicovideoPlayer from "@/components/Nicovideo";
import { prisma } from "@/lib/prisma";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";

const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    select: {
      title: true,
      createdAt: true,
      updatedAt: true,
      description: true,
      musics: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return post;
};

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const post = await getPost(id);
  return (
    <div className="p-5">
      <div className="flex">
        <p className="flex-1 text-xl font-bold">{post?.title}</p>
        <div className="flex-none text-gray-500 text-sm">
          <div className="text-gray-500 text-sm">
            Created: {post?.createdAt.toDateString()}
          </div>
          {post?.updatedAt && (
            <div className="text-gray-500 text-sm">
              Last update: {post?.updatedAt.toDateString()}
            </div>
          )}
        </div>
      </div>
      <div className="text-gray-500">by {post?.author.name ?? "anonymous"}</div>
      <p className="text-lg">Description:</p>
      <p className="p-2 bg-slate-200">{post?.description}</p>
      <div className="p-3">
        {post &&
          post?.musics &&
          post?.musics.map((music) => {
            const link = (() => {
              switch (music.linkType) {
                case "YOUTUBE":
                  return (
                    <div className="">
                      <YouTubeEmbed videoid={music.linkContent ?? ""} />
                    </div>
                  );
                case "NICONICO":
                  return (
                    <NicovideoPlayer
                      id={music.linkContent ?? ""}
                      width={300}
                      height={200}
                    />
                  );
                case "OTHER_URL":
                  return (
                    <a
                      href={music.linkContent ?? ""}
                      target="_blank"
                      className="p-2 text-blue-400"
                    >
                      {music.linkContent}
                    </a>
                  );
                case "NONE":
                  return <></>;
              }
            })();

            return (
              <div key={music.id} className="border rounded m-2">
                <div className="flex">
                  <div className="italic font-bold m-2">{music.title}</div>
                  <div className="m-2">by {music.artist}</div>
                </div>
                {link}
              </div>
            );
          })}
      </div>
      <Link href="/" className="text-blue-400">
        Return to Home
      </Link>
    </div>
  );
}
