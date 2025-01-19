"use client";

import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface FormInputProps<T> {
  label: string;
  name: Path<T>;
  placeholder?: string;
}

export function FormInput<T extends FieldValues = never>({
  label,
  name,
  placeholder,
}: FormInputProps<T>) {
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
      <input
        type="text"
        className="block m-2 h-5 p-4 border rounded w-full"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}
