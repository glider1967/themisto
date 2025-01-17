"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { FormInput } from "./FormInput";
import { PostFormData } from "@/lib/schema";
import { FormTextArea } from "./FormTextArea";

export function MusicFieldArray() {
  const { control, register, watch } = useFormContext<PostFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "musics" });

  return (
    <div>
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
            <FormInput<PostFormData>
              label="Music Title"
              name={`musics.${idx}.title`}
              placeholder="title"
            />

            <FormInput<PostFormData>
              label="Artist(Author)"
              name={`musics.${idx}.artist`}
              placeholder="artist"
            />

            <FormTextArea<PostFormData>
              label="Description of music"
              name={`musics.${idx}.desc`}
              placeholder="description"
            />

            <div>
              <p className="text-sm">Link type:</p>
              <select
                {...register(`musics.${idx}.videoLink.type`)}
                className="block w-full border rounded p-2 m-2"
              >
                <option value="none">No Video</option>
                <option value="youtube">YouTube</option>
                <option value="url">Other URL</option>
              </select>
            </div>

            {fieldName && (
              <FormInput<PostFormData>
                label={fieldName}
                name={`musics.${idx}.videoLink.${fieldName}`}
                placeholder={placeholder ?? ""}
              />
            )}

            <button
              type="button"
              onClick={() => remove(idx)}
              className="border border-red-500 text-red-500 text-sm px-3 py-1 rounded"
            >
              - Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            title: "",
            artist: "",
            desc: "",
            videoLink: { type: "none" },
          })
        }
        className="block m-2 border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded"
      >
        + Add Music
      </button>
    </div>
  );
}
