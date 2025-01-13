"use client";

import { PostFormData, postFormDataSchema } from "@/lib/schema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";

export default function PostForm({
  userId,
  initialData,
  method,
  postId,
}: {
  userId?: string;
  initialData?: PostFormData;
  method: "POST" | "PUT";
  postId?: number;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormDataSchema),
    defaultValues: initialData ?? {
      title: "",
      desc: "",
      status: false,
      musics: [{ title: "", artist: "", videoLink: { type: "none" } }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "musics" });

  if (!userId) return <div>Please login to post music list.</div>;

  const errorMassage = (message: string) => (
    <p className="text-sm text-red-600">{message}</p>
  );

  return (
    <>
      <Modal
        title="Confirmation"
        message="Do you delete input data and back to home?"
        cancel="Continue to Edit"
        open={isOpen}
        onOk={() => router.push("/mypage")}
        onCancel={() => setIsOpen(false)}
      />
      <form
        onSubmit={handleSubmit(async (value) => {
          // await new Promise((r) => setTimeout(r, 5000));
          const res = await fetch("/api/post", {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...value, userId, postId }),
          });
          if (res.ok) router.push("/mypage");
        })}
      >
        <div className="p-8">
          <p className="text-sm">Title:</p>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => errorMassage(message)}
          />
          <input
            type="text"
            className="block m-2 h-5 p-4 border rounded"
            placeholder="title"
            {...register("title", {})}
          />

          <p className="text-sm">Description:</p>
          <ErrorMessage
            errors={errors}
            name="desc"
            render={({ message }) => errorMassage(message)}
          />
          <textarea
            className="block m-2 h-20 p-2 border rounded"
            placeholder="description"
            {...register("desc", {})}
          />
          {fields.map((field, idx) => {
            const videoLinkType = watch(`musics.${idx}.videoLink.type`);
            const fieldName = (() => {
              switch (videoLinkType) {
                case "youtube":
                  return "youtubeId";
                case "niconico":
                  return "niconicoId";
                case "url":
                  return "url";
                case "none":
                  return null;
              }
            })();

            const placeholder = (() => {
              switch (videoLinkType) {
                case "youtube":
                  return "YouTube ID";
                case "niconico":
                  return "Niconico ID";
                case "url":
                  return "URL";
                case "none":
                  return null;
              }
            })();

            return (
              <div key={field.id} className="space-y-2 p-4 border rounded">
                <p className="text-sm">Music Title:</p>
                <ErrorMessage
                  errors={errors}
                  name={`musics.${idx}.title`}
                  render={({ message }) => errorMassage(message)}
                />
                <input
                  {...register(`musics.${idx}.title`, {})}
                  placeholder="title"
                  className="block w-full border rounded p-2"
                />

                <p className="text-sm">Artist(Author):</p>
                <ErrorMessage
                  errors={errors}
                  name={`musics.${idx}.artist`}
                  render={({ message }) => errorMassage(message)}
                />
                <input
                  {...register(`musics.${idx}.artist`, {})}
                  placeholder="artist"
                  className="block w-full border rounded p-2"
                />

                <p className="text-sm">Link type:</p>
                <select
                  {...register(`musics.${idx}.videoLink.type`)}
                  className="block w-full border rounded p-2"
                >
                  <option value="none">No Video</option>
                  <option value="youtube">YouTube</option>
                  {/* <option value="niconico">Niconico</option> */}
                  <option value="url">Other URL</option>
                </select>

                {fieldName && (
                  <>
                    <p className="text-sm">{fieldName}</p>
                    <ErrorMessage
                      errors={errors}
                      name={`musics.${idx}.videoLink.${fieldName}`}
                      render={({ message }) => errorMassage(message)}
                    />
                    <input
                      {...register(`musics.${idx}.videoLink.${fieldName}`)}
                      placeholder={placeholder ?? ""}
                      className="block w-full border rounded p-2"
                    />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                >
                  - Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() =>
              append({ title: "", artist: "", videoLink: { type: "none" } })
            }
            className="block m-2 bg-blue-600 text-white text-sm px-3 py-1 rounded"
          >
            + Add Music
          </button>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              {...register("status")}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium">Publish this post</span>
          </label>
          <button
            type="submit"
            className="relative block m-2 p-2 border border-gray-500 rounded"
            disabled={isSubmitting || isSubmitSuccessful}
          >
            Submit
            {(isSubmitting || isSubmitSuccessful) && (
              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3 top-0 right-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
              </div>
            )}
          </button>
        </div>
      </form>
      <button className="p-2 text-red-400" onClick={() => setIsOpen(true)}>
        Cancel
      </button>
    </>
  );
}
