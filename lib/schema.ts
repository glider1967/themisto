import { z } from "zod";

const videoLinkSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("youtube"),
    youtubeId: z.string().min(1, "YouTube ID is required"),
  }),
  z.object({
    type: z.literal("niconico"),
    niconicoId: z.string().min(1, "Niconico ID is required"),
  }),
  z.object({
    type: z.literal("url"),
    url: z.string().url("Invalid URL"),
  }),
  z.object({
    type: z.literal("none"),
  }),
]);

export type VideoLink = z.infer<typeof videoLinkSchema>;

export const musicFormDataSchema = z.object({
  title: z.string().min(1, "Music title is required"),
  artist: z.string().min(1, "Artist name is required"),
  videoLink: videoLinkSchema,
});

export type MusicFront = z.infer<typeof musicFormDataSchema>;

export const postFormDataSchema = z.object({
  title: z.string().min(1, "List title is required"),
  desc: z.string().min(1, "Artist name is required"),
  status: z.boolean(),
  musics: z.array(musicFormDataSchema),
});

export type PostFormData = z.infer<typeof postFormDataSchema>;

export const postCreateSchema = postFormDataSchema.extend({
  userId: z.string(),
});

export const postUpdateSchema = postFormDataSchema.extend({
  userId: z.string(),
  postId: z.number(),
});
