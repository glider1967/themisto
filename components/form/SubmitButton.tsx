"use client";

import { useFormContext } from "react-hook-form";

export function SubmitButton() {
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = useFormContext();

  return (
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
  );
}
