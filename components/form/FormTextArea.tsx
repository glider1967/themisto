"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

interface FormTextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
}
export function FormTextArea({ label, name, placeholder }: FormTextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="text-sm">{label}:</p>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-sm text-red-600">{message}</p>
        )}
      />
      <textarea
        className="block m-2 h-20 p-2 border rounded"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}
