import { VideoLinkType } from "@prisma/client";
import { MusicFront, VideoLink } from "./schema";

export function toFrontObject(
  type: VideoLinkType,
  content: string | null
): VideoLink {
  switch (type) {
    case "YOUTUBE":
      return { type: "youtube", youtubeId: content ?? "" };
    case "NICONICO":
      return { type: "niconico", niconicoId: content ?? "" };
    case "OTHER_URL":
      return { type: "url", url: content ?? "" };
    case "NONE":
      return { type: "none" };
  }
}

export function toBackObject(musics: MusicFront[]): {
  title: string;
  artist: string;
  description: string | null;
  linkType: VideoLinkType;
  linkContent: string | null;
}[] {
  return musics.map((music) => {
    const videoLink = music.videoLink;
    const ta = {
      title: music.title,
      artist: music.artist,
      description: music.desc,
    };
    switch (videoLink.type) {
      case "youtube":
        return {
          ...ta,
          linkType: "YOUTUBE",
          linkContent: videoLink.youtubeId,
        };
      case "niconico":
        return {
          ...ta,
          linkType: "NICONICO",
          linkContent: videoLink.niconicoId,
        };
      case "url":
        return { ...ta, linkType: "OTHER_URL", linkContent: videoLink.url };
      case "none":
        return { ...ta, linkType: "NONE", linkContent: null };
    }
  });
}
