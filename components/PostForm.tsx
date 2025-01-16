"use client";

import { PostFormData, postFormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import { MusicFieldArray } from "./form/MusicFieldArray";
import { FormInput } from ".//form/FormInput";
import { FormTextArea } from "./form/FormTextArea";
import { PublishToggle } from "./form/PublishToggle";
import { SubmitButton } from "./form/SubmitButton";

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

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postFormDataSchema),
    defaultValues: initialData ?? {
      title: "",
      desc: "",
      status: false,
      musics: [
        { title: "", artist: "", desc: "", videoLink: { type: "none" } },
      ],
    },
  });

  if (!userId) return <div>Please login to post music list.</div>;

  return (
    <FormProvider {...methods}>
      <Modal
        title="Confirmation"
        message="Do you delete input data and back to home?"
        cancel="Continue to Edit"
        open={isOpen}
        onOk={() => router.push("/mypage")}
        onCancel={() => setIsOpen(false)}
      />
      <form
        onSubmit={methods.handleSubmit(async (value) => {
          const res = await fetch("/api/post", {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...value, userId, postId }),
          });
          if (res.ok) router.push("/mypage");
        })}
      >
        <div className="p-8">
          <FormInput label="Title" name="title" placeholder="title" />

          <FormTextArea
            label="Description"
            name="desc"
            placeholder="description"
          />

          <MusicFieldArray />

          <PublishToggle />

          <SubmitButton />
        </div>
      </form>
      <button className="p-2 text-red-400" onClick={() => setIsOpen(true)}>
        Cancel
      </button>
    </FormProvider>
  );
}
