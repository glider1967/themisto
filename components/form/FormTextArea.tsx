"use client";

import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface FormTextAreaProps<T> {
  label: string;
  name: Path<T>;
  placeholder?: string;
}

export function FormTextArea<T extends FieldValues = never>({
  label,
  name,
  placeholder,
}: FormTextAreaProps<T>) {
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
