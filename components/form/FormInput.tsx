"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
}

export function FormInput({ label, name, placeholder }: FormInputProps) {
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
        className="block m-2 h-5 p-4 border rounded"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}
